# Generated by Django 4.2.5 on 2024-06-13 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projeto', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='observacao_professor',
            field=models.TextField(default=''),
        ),
    ]
