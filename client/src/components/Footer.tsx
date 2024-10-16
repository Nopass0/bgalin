import { motion } from "framer-motion";

const Footer = () => {
  const inn = import.meta.env.VITE_INN || "XXXXXXXXXX";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#231f20] text-white py-4"
    >
      <div className="container mx-auto text-center">
        <p>ИП Галин Богдан Маратович, ИНН: {inn}</p>
        <p>&copy; {new Date().getFullYear()} Все права защищены</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
