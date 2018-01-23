# Generated by Django 2.0.1 on 2018-01-23 06:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gate', '0003_auto_20180117_1147'),
    ]

    operations = [
        migrations.CreateModel(
            name='BatchPaperTicket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Criado em')),
                ('modified_on', models.DateTimeField(auto_now=True, verbose_name='Modificado em ')),
                ('name', models.CharField(max_length=100, verbose_name='Nome')),
                ('first_line', models.PositiveIntegerField(default=1)),
                ('contents', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='wristband',
            name='wristband_code',
            field=models.CharField(blank=True, db_index=True, error_messages={'unique': 'WBAND_CODE_EXISTS: Esta pulseira já foi registrada em nosso sistema.'}, max_length=100, null=True, unique=True, verbose_name='Pulseira'),
        ),
        migrations.AddField(
            model_name='paperticket',
            name='batch',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='gate.BatchPaperTicket'),
        ),
    ]