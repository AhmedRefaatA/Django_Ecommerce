from django.db import models
from django.shortcuts import reverse
from django.contrib.auth.models import User

CATEGORY_CHOICES = (
    ('s', 'shirt'),
    ('sw', 'sportWear'),
    ('ow', 'outWear')
)

LABEL_CHOICES = (
    ('s', 'secondary'),
    ('p', 'primary'),
    ('d', 'danger')
)

class Item(models.Model):
    title = models.CharField(max_length=200)
    price = models.IntegerField()
    discount_price = models.IntegerField(blank=True, null=True)
    slug = models.SlugField()
    status = models.CharField(max_length=200)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=2)
    describtion = models.TextField()
    image = models.ImageField(default="defaulte.jpg", upload_to="static/img")
    
    def __str__(self):
        return self.title

    def get_add_to_cart_url(self):
        return reverse('add_to_cart', kwargs={'slug':self.slug})

    def get_remove_from_cart_url(self):
        return reverse('remove_from_cart', kwargs={'slug':self.slug})

class Variation(models.Model):
    item = models.ForeignKey('Item', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    class Meta:
        unique_together = (
            ('item', 'name')
        )
    def __str__(self):
        return self.name

class ItemVariation(models.Model):
    variation = models.ForeignKey('Variation', on_delete=models.CASCADE)
    value = models.CharField(max_length=200)
    attachment = models.ImageField(upload_to="static/img", blank=True, null=True)

    class Meta:
        unique_together = (
            ('variation', 'value')
        )

    def __str__(self):
        return self.value        
    

class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)
    item_variation = models.ManyToManyField(ItemVariation)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()

    def __str__(self):
        return self.user.username

