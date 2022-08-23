# 헬신 API 서버

## 0. Information
### 0-1. API Documents
- Production API: https://api.be-healthy.life/docs
- Development API: https://api.dev.be-healthy.life/docs
### 0-2. Maintainers
- 이준수 | [@adrinerDP](https://github.com/adrinerDP)
- 임채성 | [@puleugo](https://github.com/puleugo)
### 0-3. Technical Specs
- Node.js 16 (with Yarn)
- PostgreSQL 14
- Nest.js 9

---

## 1. Prerequisites

### 1-1. Setup Environment Variables
Copy example environment variables.
```shell
$ cp .env.example .env
```
Change values below accordingly.
```dotenv
# Application
APP_URL=http://localhost:3000
APP_PORT=3000
APP_SECRET=xxxxxxxxxx

# Database
DB_HOST=k8s.adrinerdp.co
DB_PORT=5432
DB_DATABASE=xxxxxxxxxx
DB_USERNAME=xxxxxxxxxx
DB_PASSWORD=xxxxxxxxxx
```

### 1-2. Install Dependencies
This project uses **yarn** as a package manager.
```shell
$ yarn
```

---

## 2. Run Project
### 2-1. Run Server
You can start development server with this command.
```shell
$ yarn start:dev
```

### 2-2. Migrate Database
> The migrations will **run automatically** when the server is started. 
> When it doesn't work, you can migrate manually with this command.
```shell
$ yarn migration:run
```

### 2-3. Generate New Migration
```shell
$ yarn migration:generate src/migrations/{migration_name}
``` 
#### Examples of Migration names
- `create_users_table`
- `add_social_vendor_id_to_users_table`
- `drop_password_from_users_table`

---

## 3. Deployment
This project uses Github Actions to do CI/CD.

### 3-0. Action Runner Secrets
- **KUBE_CONFIG**: Kubernetes Configurations to use cluster's API.
- **HARBOR_USERNAME**: Docker Registry username.
- **HARBOR_ACCESS_TOKEN**: Docker Registry password.
- **DISCORD_WEBHOOK**: Discord Webhook endpoint to send deployment logs.

### 3-1. Build and Push to Docker Registry
```yaml
- name: Build and push
  uses: docker/build-push-action@v3
  with:
    context: .
    target: production
    push: true
    platforms:
      linux/amd64
    tags: harbor.adrinerdp.co/healthin/api:latest, harbor.adrinerdp.co/healthin/api:${{ steps.version.outputs.code }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### 3-2. Update Image Tag
```yaml
- name: Deploy to cluster
  uses: actions-hub/kubectl@master
  env:
    KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
    with:
      args: set image deployment healthin-api healthin-api=harbor.adrinerdp.co/healthin/api:${{ steps.version.outputs.code }}
```
