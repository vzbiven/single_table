from django.db import models

# Create your models here.

class Emoji(models.Model):
    """Emoji information"""
    emoji = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    group = models.CharField(max_length=200)
    sub_group = models.CharField(max_length=200)
    codepoints = models.CharField(max_length=200)
    def __str__(self):
        str = self.emoji + ' ' + self.name
        return str
