# Generated by Django 4.2 on 2024-04-30 18:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("testings", "0003_alter_relation_image"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="answer",
            options={
                "ordering": ["?"],
                "verbose_name": "Вариант ответа",
                "verbose_name_plural": "Варианты ответа",
            },
        ),
    ]
