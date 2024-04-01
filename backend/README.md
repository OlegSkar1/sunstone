## Создать файл ```.env``` в корне проекта

    # DJANGO
    SECRET_KEY='kipzc*9@f%^a0!7h_%23lyh!4trkmz=(!dpdo32noy4axm=izt'
    
    # SITE
    SITE_HOST=localhost
    
    # DOCS
    API_DOCS_ENABLE=true
    
    # POSTGRES
    POSTGRES_NAME=postgres
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=12345
    POSTGRES_PORT=5432
    POSTGRES_HOST=db
    
    # DEBUG
    DEBUG=true
    
    # CELERY
    CELERY_BROKER_URL=redis://redis:6379/0
    CELERY_RESULT_BACKEND=redis://redis:6379/0

## Локальный запуск бэкенда
Выполнить в корне проекта:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### SWAGGER

    htttp://localhost:8080/api/docs

### Админ-панель

    htttp://localhost:8080/admin

### Создание суперпользователя

    docker compose exec backend python manage.py createsuperuser