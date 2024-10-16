import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#231f20] text-white py-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Богдан Галин
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link
              to="https://t.me/pbgal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2" />
              Связаться
            </Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
