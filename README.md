# Описание
SUNSTONE - приложение для самообучения пользователей.

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

    # FRONTEND
    FRONTEND_PORT=3000
    
    # Auth config
    NEXTAUTH_SECRET='https://generate-secret.vercel.app/32'
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_BASE_URL=http://localhost

## Запуск
Выполнить в корне проекта:
```shell
docker-compose -f docker-compose.prod.yml up -d --build
```

## Использование
Зайти на ```http://localhost:3000```

### SWAGGER

    htttp://localhost/api/docs

### Админ-панель

    htttp://localhost/admin

### Создание суперпользователя

    docker compose exec backend python manage.py createsuperuser

