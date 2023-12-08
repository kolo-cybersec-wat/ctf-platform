import django.forms as forms


class FlagSubmissionForm(forms.Form):
    task_pk = forms.IntegerField()
    flag = forms.CharField()
