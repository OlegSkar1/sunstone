#!/bin/sh

if [ "$POSTGRES_NAME" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py migrate --no-input
python manage.py collectstatic --no-input --clear

exec "$@"