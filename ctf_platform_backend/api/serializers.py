from rest_framework import serializers

from ctf_platform_backend.api.models import Competition, CompetitionTask, CompetitionTaskFile


class CompetitionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Competition
        fields = "__all__"
        lookup_field = "slug"
        extra_kwargs = {"url": {"lookup_field": "slug"}}


class CompetitionTaskSerializer(serializers.HyperlinkedModelSerializer):
    is_completed = serializers.BooleanField()

    category = serializers.SlugRelatedField(read_only=True, slug_field="name")
    attachments = serializers.SerializerMethodField()

    def get_attachments(self, task: CompetitionTask):
        return CompetitionTaskFile.objects.filter(
            task=task
        ).all().values_list("file", flat=True)

    class Meta:
        model = CompetitionTask
        fields = (
            "pk",
            "title",
            "category",
            "description",
            "attachments",
            "points",
            "is_completed",
        )


class SubmitFlagSerializer(serializers.Serializer):
    flag = serializers.CharField()
    task_pk = serializers.IntegerField()

    def validate(self, attrs):
        # Take username and password from request
        flag = attrs.get("flag")
        task_pk = attrs.get("task_pk")

        try:
            task = CompetitionTask.objects.get(pk=task_pk)

            if flag != task.flag:
                raise serializers.ValidationError("Flag is invalid")

            if not task.competition.are_submissions_open:
                raise serializers.ValidationError("Submissions are closed")

        except CompetitionTask.DoesNotExist:
            raise serializers.ValidationError("Task does not exist")

        return attrs
