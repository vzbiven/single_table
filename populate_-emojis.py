import os
import csv
os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                        'single_table_proj.settings')
import django
django.setup()
from single_table_app.models import Emoji

def populate():
    filename = 'emoji_df.csv'
    with open(filename) as f:
        reader = csv.reader(f)
        header_row = next(reader)

        for row in reader:
            add_emoji(*row)

def add_emoji(emoji, name, group, sub_group, codepoints):
    e = Emoji.objects.get_or_create(emoji=emoji)[0]
    e.name=name
    e.group=group
    e.sub_group=sub_group
    e.codepoints=codepoints
    e.save()
    return e

if __name__ == '__main__':
    print('Starting population script...')
    populate()
