import { Building2, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Hieraflow</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              La solution innovante pour structurer et visualiser vos organigrammes 
              d'entreprise de manière intuitive et efficace.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Solution</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-accent transition-colors">Organigramme Interactif</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Trombinoscope</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Gestion des Rôles</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Interface CMS</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Déploiement</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-accent transition-colors">Solution Cloud</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Installation On-Premise</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Support & Formation</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:contact@hieraflow.com" className="hover:text-accent transition-colors">
                  contact@hieraflow.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Lun - Ven : 9h - 18h</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-glow" />
                <span>France • Europe • International</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60">
              © 2024 Hieraflow. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 text-background/60">
              <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-accent transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;