from django.contrib.gis.db import models

class Entry(models.Model):
    feedTime = models.DateTimeField()
    feedType = models.CharField(max_length=50)
    feedAmt = models.FloatField()
    feedLoc = models.PointField(geography=True)
    flockSize = models.IntegerField()

    def __str__(self):
        return f'{self.flockSize} ducks fed {self.feedAmt}g of {self.feedType} at {self.feedTime}'


