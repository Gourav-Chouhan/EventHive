from django.db import models

class User(models.Model):
    class Meta:
        app_label = 'users'
        db_table = 'users' # Specify the table name here
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

class Event(models.Model):
    class Meta:
        app_label = 'events'
        db_table = 'events' # Specify the table name here


    title = models.CharField(max_length=255)
    description = models.TextField()
    # start_time = models.DateTimeField
    location = models.CharField(max_length=255, null=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    likes_count = models.IntegerField(default=0)


class Like(models.Model):
    class Meta:
        app_label = 'likes'
        db_table = 'likes' # Specify the table name here

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

