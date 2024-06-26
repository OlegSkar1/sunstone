# Generated by Django 4.2 on 2024-04-29 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("testings", "0002_alter_question_type_relation"),
    ]

    operations = [
        migrations.AlterField(
            model_name="relation",
            name="image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to="answers/images",
                verbose_name="Изображение",
            ),
        ),
    ]
