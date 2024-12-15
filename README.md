# Node-sb-01 🚀

Une application full-stack moderne afin de faire ses premiers pas avec les technologies cloud.

## 🌟 Caractéristiques

- **Architecture Full-Stack**

  - Backend: Node.js + Express.js
  - Frontend: Angular
  - Base de données: MongoDB

- **Conteneurisation & Orchestration**

  - Conteneurs Docker pour chaque composant
  - Configuration Kubernetes complète
  - Déploiement automatisé via GitHub Actions

- **DevOps & Infrastructure**
  - Pipeline CI/CD vers serveur Fedora
  - Architecture microservices
  - Configuration Ingress pour le routage

## 🛠️ Stack Technique

- **Backend**: Node.js, Express.js
- **Frontend**: Angular
- **Database**: MongoDB
- **DevOps**: Docker, Kubernetes, GitHub Actions
- **Outils**: Makefile, Shell Scripts

## 🏗️ Architecture

```sh
.
├── backend/          # Service Node.js
├── frontend/         # Application Angular
├── database/         # Configuration MongoDB
├── kubernetes/       # Manifestes K8s
│   ├── backend/
│   ├── frontend/
│   ├── database/
│   └── ingress/
└── docker-compose.yml
```

## 🚀 Installation

1. **Cloner le repository**

   ```bash
   git clone git@github.com:DevPaulPOps/Node-sb-01.git
   cd Node-sb-01
   ```

2. **Configuration**

   ```bash
   cp config.json.template config.json
   # Éditer config.json avec vos paramètres
   ```

3. **Démarrage avec Docker**

   ```bash
   docker-compose up -d
   ```

4. **Déploiement Kubernetes**

   ```bash
   cd kubernetes
   kubectl apply -f ingress/ingress.yaml
   helm install backend ./backend/backend-deployment
   helm install frontend ./frontend/frontend-deployment
   helm install database ./database/database-deployment
   ```

## 📚 Documentation API

### Routes Backend

- `GET /backend/firstName`: Récupère le prénom de l'utilisateur
- `PUT /backend/firstName`: Met à jour le prénom de l'utilisateur

## 🛡️ Sécurité

- Gestion des CORS configurables
- Utilisation de cookies pour l'identification
- Configuration sécurisée via variables d'environnement

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'feat: Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

_Ce projet a été développé pour explorer et démontrer l'intégration de technologies cloud-native modernes._
