# Generated by Django 4.1.1 on 2022-09-12 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0002_patient_is_medic_alter_patient_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='allergies',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='contact',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='em_contact_relationship',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='emergency_contact',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='health_status',
            field=models.TextField(blank=True, null=True),
        ),
    ]
