import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/api";

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
}

const AdminPanel = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAdminProjects();
        setProjects(projectsData);
      } catch (err) {
        setError("Произошла ошибка при загрузке проектов");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      url: formData.get("url") as string,
    };

    try {
      const newProject = await createProject(projectData);
      setProjects([...projects, newProject]);
      event.currentTarget.reset();
    } catch (err) {
      setError("Произошла ошибка при создании проекта");
      console.error(err);
    }
  };

  const handleUpdateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!editingProject) return;

    const formData = new FormData(event.currentTarget);
    const projectData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      url: formData.get("url") as string,
    };

    try {
      const updatedProject = await updateProject(
        editingProject.id,
        projectData
      );
      setProjects(
        projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      setEditingProject(null);
    } catch (err) {
      setError("Произошла ошибка при обновлении проекта");
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      setError("Произошла ошибка при удалении проекта");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>
      <Button onClick={handleLogout} className="mb-8">
        Выйти
      </Button>

      <h2 className="text-2xl font-bold mb-4">Создать новый проект</h2>
      <form onSubmit={handleCreateProject} className="space-y-4 mb-8">
        <Input name="name" placeholder="Название проекта" required />
        <Textarea name="description" placeholder="Описание проекта" required />
        <Input name="imageUrl" placeholder="URL изображения" required />
        <Input name="url" placeholder="URL проекта" required />
        <Button type="submit">Создать проект</Button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Список проектов</h2>
      {projects.map((project) => (
        <div key={project.id} className="border p-4 mb-4">
          {editingProject && editingProject.id === project.id ? (
            <form onSubmit={handleUpdateProject} className="space-y-4">
              <Input name="name" defaultValue={project.name} required />
              <Textarea
                name="description"
                defaultValue={project.description}
                required
              />
              <Input name="imageUrl" defaultValue={project.imageUrl} required />
              <Input name="url" defaultValue={project.url} required />
              <Button type="submit">Сохранить изменения</Button>
              <Button type="button" onClick={() => setEditingProject(null)}>
                Отменить
              </Button>
            </form>
          ) : (
            <>
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p>{project.description}</p>
              <p>Изображение: {project.imageUrl}</p>
              <p>URL: {project.url}</p>
              <Button onClick={() => setEditingProject(project)}>
                Редактировать
              </Button>
              <Button onClick={() => handleDeleteProject(project.id)}>
                Удалить
              </Button>
            </>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default AdminPanel;
