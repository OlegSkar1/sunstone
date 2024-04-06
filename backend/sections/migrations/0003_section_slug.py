# Generated by Django 4.2 on 2024-04-06 09:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sections", "0002_alter_section_description"),
    ]

    operations = [
        migrations.AddField(
            model_name="section",
            name="slug",
            field=models.SlugField(
                default=datetime.datetime(
                    2024, 4, 6, 9, 43, 58, 114234, tzinfo=datetime.timezone.utc
                ),
                unique=True,
                verbose_name="Алиас",
            ),
            preserve_default=False,
        ),
    ]