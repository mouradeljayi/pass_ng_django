from rest_framework import serializers
from .models import User,App,Password
from cryptography.fernet import Fernet
from back_generateurpassword.settings import key

class UserSer(serializers.ModelSerializer):
    class Meta:
      model = User
      fields = '__all__'

class AppSer(serializers.ModelSerializer):
    class Meta:
      model = App
      fields = '__all__'

class PasswordSer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='IdUser.Name',default=None)
    app_name = serializers.CharField(source='IdApp.NomApp',default=None)

    class Meta:
        model = Password
        fields = '__all__'

    # def to_representation(self, instance):
    #     f = Fernet(key)
    #     decrypted_password = f.decrypt(instance.Password.encode())
    #     instance.Password = decrypted_password.decode()
    #     return super(PasswordSer, self).to_representation(instance)

    def to_representation(self, instance):
        # Check if the current request is a GET request and the instance is not None
        if self.context['request'].method == 'GET' and instance is not None:
            f = Fernet(key)
            print("voici les details de l'instance: ", instance.Password)
            decrypted_password = f.decrypt(instance.Password.encode())
            instance.Password = decrypted_password.decode()

        return super(PasswordSer, self).to_representation(instance)
    


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
