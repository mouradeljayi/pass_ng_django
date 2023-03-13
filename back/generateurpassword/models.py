from django.db import models
from cryptography.fernet import Fernet
from back_generateurpassword.settings import key
from django.core.mail import send_mail

# Create your models here.
class User (models.Model):
    id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=200)
    Email = models.EmailField(unique=True)
    Lastname = models.CharField(max_length=200)
    Role = models.CharField(max_length=200)
    Note = models.TextField(null=True)
    Datecreation = models.DateTimeField(auto_now_add=True)
    field = models.FileField(upload_to='uploads/',null=True, default=None)
    image = models.ImageField(upload_to='uploads/image',null=True, default=None)

    def __str__(self):
        return str({'id':self.id,'username':self.Name,'Role':self.Role})

class App(models.Model):
    id = models.AutoField(primary_key=True)
    NomApp = models.CharField(max_length=200,unique=True)
    UrlApp = models.CharField(max_length=200,null=True)
    Datecreation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)+' - '+str(self.NomApp)

class Password (models.Model):
    IdUser = models.ForeignKey(User, on_delete=models.CASCADE)
    IdApp = models.ForeignKey(App,on_delete=models.CASCADE)
    Password = models.CharField(max_length=200,unique=True)
    Etat = models.BooleanField()
    Datecreation = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Check if the password has changed
        if self.pk is not None:
            old_password = Password.objects.get(pk=self.pk).Password
            if old_password != self.Password:
                # Send an email notification to the user
                # subject = 'Your password has been updated'
                # message = f'Your current password for {self.IdApp} has been changed to {self.Password}.'
                # from_email = 'paiperlecktest@gmail.com' # Change this to your email address
                # recipient_list = [self.IdUser.Email]
                # send_mail(subject, message, from_email, recipient_list, fail_silently=False)
                send_mail(
            'Password Update',
            f'Your password has been updated. Your new password is {self.Password}.',
            'sender@example.com',
            [self.IdUser.Email],  # Use related user's email field
            fail_silently=False,
        )
                
        # Encrypt the password
        f = Fernet(key)
        encrypted_password = f.encrypt(self.Password.encode())
        self.Password = encrypted_password.decode()
        
        super().save(*args, **kwargs)

    #  def save(self, *args, **kwargs):
    #     f = Fernet(key)
    #     encrypted_password = f.encrypt(self.Password.encode())
    #     self.Password = encrypted_password.decode()
    #     super(Password, self).save(*args, **kwargs)


    # def update(self, *args, **kwargs):
    #      # Check if the password has changed
    #     if self.pk is not None:
    #         old_password = Password.objects.get(pk=self.pk).Password
    #         if old_password != self.Password:
    #             # Send an email notification to the user
    #             # subject = 'Your password has been updated'
    #             # message = f'Your current password for {self.IdApp} has been changed to {self.Password}.'
    #             # from_email = 'paiperlecktest@gmail.com' # Change this to your email address
    #             # recipient_list = [self.IdUser.Email]
    #             # send_mail(subject, message, from_email, recipient_list, fail_silently=False)
    #             send_mail(
    #         'Password Update',
    #         f'Your password has been updated. Your new password is {self.Password}.',
    #         'sender@example.com',
    #         [self.IdUser.Email],  # Use related user's email field
    #         fail_silently=False,
    #     )
               

    #     f = Fernet(key)
    #     encrypted_password = f.encrypt(kwargs['Password'].encode())
    #     kwargs['Password'] = encrypted_password.decode()
    #     super(Password, self).update(*args, **kwargs)
    

#IdUser et IdApp combinés Unique
    class Meta:
        unique_together = (('IdUser', 'IdApp'),)

    def __str__(self):
        return str(self.IdUser)+ ' / ' + str(self.IdApp) +' / ' + str(self.Password)


    
        



