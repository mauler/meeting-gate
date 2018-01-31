# Generated by Django 2.0.1 on 2018-01-31 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gate', '0005_auto_20180131_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qrcode',
            name='qrcode_requires_identification',
            field=models.BooleanField(default=False, help_text='qrcode_requires_identification', verbose_name='qrcode_requires_identification verbose_name'),
        ),
        migrations.AlterUniqueTogether(
            name='paperticket',
            unique_together={('batch', 'batch_line')},
        ),
    ]
