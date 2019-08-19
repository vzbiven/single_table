from rest_framework import serializers
from single_table_app.models import Emoji


class EmojiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emoji
        fields = ('id', 'emoji', 'name', 'group', 'sub_group', 'codepoints')

        emoji = serializers.CharField(max_length=200)
        name = serializers.CharField(max_length=200)
        group = serializers.CharField(max_length=200)
        sub_group = serializers.CharField(max_length=200)
        codepoints = serializers.CharField(max_length=200)


        def create(self, validated_data):
            return Emoji.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.emoji = validated_data.get('emoji', instance.emoji)
            instance.name = validated_data.get('name', instance.name)
            instance.group = validated_data.get('group', instance.group)
            instance.sub_group = validated_data.get('sub_group', instance.sub_group)
            instance.codepoints = validated_data.get('codepoints', instance.codepoints)
            instance.save()
            return instance