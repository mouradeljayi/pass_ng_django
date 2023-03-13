from rest_framework import viewsets, filters
from django.db.models import Count
from .serializers import UserSer, AppSer, PasswordSer,UserSerializers
from .models import User, App, Password
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from django.utils.timezone import now, timedelta
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save,post_delete,pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User as DjangoUser
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_migrate

from cryptography.fernet import Fernet
from back_generateurpassword.settings import key
from django.forms.models import model_to_dict



#create a default user the first time the server is launched
@receiver(post_migrate)
def create_default_data(sender, **kwargs):
    if not User.objects.filter(Email='paiperleck@gmail.com').exists():
        # create a default user
        user = User.objects.create(Email='paiperleck@gmail.com')
        user.Name = 'paiperleck'
        user.Lastname = 'User'
        user.Role = 'admin'
        user.save()

    if not App.objects.filter(NomApp='PaiperPass').exists():
        # create a default app
        app = App.objects.create(NomApp='PaiperPass')
        app.UrlApp = 'http://localhost:8000'
        app.save()

    if not Password.objects.filter(IdUser__Email='paiperleck@gmail.com', IdApp__NomApp='PaiperPass').exists():
        # create a default password for the default user and app
        user = User.objects.get(Email='paiperleck@gmail.com')
        app = App.objects.get(NomApp='PaiperPass')
        password = Password.objects.create(IdUser=user, IdApp=app, Password='paiperleck212', Etat=True)
        password.save()




#creation d'un User du django apres chaque ajout ou modification du password
@receiver(post_save, sender=Password)
def create_or_update_user(sender, instance, created, **kwargs):
    # decrypt the password
    f = Fernet(key)
    decrypted_password = f.decrypt(instance.Password.encode())
    instance.Password = decrypted_password.decode()
    mail = instance.IdUser.Email

    if not created:
        # delete the old DjangoUser instance
        try:
            delUser = DjangoUser.objects.get(first_name=instance.id)
            print("Suppression de l'ancien user: ", delUser)
            delUser.delete()
        except DjangoUser.DoesNotExist:
            pass

        # create or update the DjangoUser instance with the new password
        user, _ = DjangoUser.objects.get_or_create(username=instance.Password,password=make_password(mail),email=mail,first_name=instance.id,last_name=instance.IdApp.id)
        #user=User.objects.create(username=instance.IdUser.Email,password=instance.Password)
        user.save()

        return
        
    if created:
        print("l'adresse Email créee est: ", mail)
        print("le mot de passe est: ", instance.Password)

        # create or update the DjangoUser instance with the new password
        user, _ = DjangoUser.objects.get_or_create(username=instance.Password,password=make_password(mail),email=mail,first_name=instance.id,last_name=instance.IdApp.id)
        #user=User.objects.create(username=instance.IdUser.Email,password=instance.Password)
        user.save()
        return

   



# #on delete User ✔
# @receiver(post_delete, sender=User)
# def delete_user(sender, instance, **kwargs):
    
#     try:
# #email was used to store the user mail
#         user = DjangoUser.objects.get(email=instance.Email)
#         print("Suppression du user: ", instance.Email)
#         user.delete()
#     except DjangoUser.DoesNotExist:
#         pass


# #On delete App ✔
# @receiver(post_delete, sender=App)
# def delete_user(sender, instance, **kwargs):
    
#     try:
#         #last_name was used to store the App id
#         user = DjangoUser.objects.get(last_name=instance.id)
#         print("Suppression du user lié à l'application: ", instance.NomApp)
#         user.delete()
#     except DjangoUser.DoesNotExist:
#         pass


#on delete password ✔ , the password is also automatically deleted whenever a user or app is deleted
@receiver(post_delete, sender=Password)
def delete_user(sender, instance, **kwargs):
    
    try:
        #decrypté le password
        f = Fernet(key)
        decrypted_password = f.decrypt(instance.Password.encode())
        instance.Password = decrypted_password.decode()

        user = DjangoUser.objects.get(username=instance.Password)
        user.delete()
    except DjangoUser.DoesNotExist:
        pass


#class qui verifie l'authentification
class IsAuthenticatedOrDenied(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)



@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    passwd = request.data.get('password')
    djangoPass = passwd

    try:
        #retrieve URL
        url = request.build_absolute_uri()
        # print("voici lurl de la requete:",url)
        splitUrl=url.split(":")
        trueUrl=splitUrl[1]

        user = User.objects.get(Email=email)
        print("le user est: ",user)

        passwords=Password.objects.all()
        # Decrypt the Password field of each Password object using Fernet
        f = Fernet(key)
        password = None
        for passw in passwords:
            decrypted_password = f.decrypt(passw.Password.encode()).decode()
            if passwd == decrypted_password:
                print("Decrypted password:", decrypted_password)
                password = passw
                break

        if password == None:
            return Response({'Erreur':"Ce mot de passe n'existe pas",'access':False,'etat':False})


        # password=Password.objects.get(Password=passwd)
        # print("le password recuperé est: ", password)

        #verifier si User est inactif
        if not password.Etat: 
            return Response({'Erreur':"Ce compte est desactivé pour cette application",'access':False,'etat':False})
        caract=str(password.IdApp)
        spl= caract.split("-")
        idApp=spl[0]
        # print("Lidentifiant du password est: ", idApp)
        # print("les password sont: ", passwords)
        # print(passwd,"=======",passwords.Password)
        app=App.objects.get(id=idApp)
        # print("app: ", app)
        nomApp=app.NomApp
        # print("Nom app: ", nomApp)
        # passwords = Password.objects.get(IdUser=user.id,IdApp=idApp)

#verification du nom d'application et l'url de la requete s'ils sont pareils,pas terminé pour le moment
#on fera if not nomApp==trueUrl par la suite
        if not trueUrl == "//localhost":
            return Response({'Erreur':"ce mot de passe n'est pas pour cette application",'access':False,'etat':True})


        # and passwd == passwords.Password
        if user :
                #UserSerializer=AuthTokenSerializer(data=request.data)
                print("voici les data: ", request.data)
                UserSerializer=AuthTokenSerializer(data={
                                'username': djangoPass,
                                'password': email
                            })
                
                UserSerializer.is_valid(raise_exception=True)
                ValUser=UserSerializer.validated_data['user']
                token, created = Token.objects.get_or_create(user=ValUser)
                serializer = UserSerializers(user)
                return Response({'access':True,'Info':serializer.data ,'NomApp':nomApp, 'token':token.key,'etat':True})
        
    except (User.DoesNotExist, Password.DoesNotExist):
        raise AuthenticationFailed('Invalid username or password')

    raise AuthenticationFailed('Invalid password')



class UserView(viewsets.ModelViewSet):
    #permission requise
    permission_classes = [IsAuthenticatedOrDenied]

    queryset = User.objects.all()
    serializer_class = UserSer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'Name', 'Email', 'Lastname', 'Role', 'Etat', 'Datecreation']

    @action(detail=False, methods=['get'])
    def role_stats(self, request):
        role_counts = User.objects.values('Role').annotate(rolecount=Count('id'))
        stats = {role['Role']: role['rolecount'] for role in role_counts}
        return Response(stats)
    
    @action(detail=False, methods=['get'])
    def users_stats(self, request):
        users_count = User.objects.count()
        today = now().date()
        num_users_today = User.objects.filter(Datecreation__date=today).count()
        week_ago = now().date() - timedelta(days=7)
        num_users_last_week = User.objects.filter(Datecreation__date__gte=week_ago).count()
        num_users_this_year = User.objects.filter(Datecreation__year=today.year).count()
        users_count = User.objects.count()
        return Response({
            'users_count': users_count,
            'users_today': num_users_today,
            'users_last_week': num_users_last_week,
            'users_this_year': num_users_this_year

        })



class AppView(viewsets.ModelViewSet):
    #permission requise
    permission_classes = [IsAuthenticatedOrDenied]

    queryset = App.objects.all()
    serializer_class = AppSer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'NomApp', 'Datecreation', 'UrlApp']

    @action(detail=False, methods=['get'])
    def app_stats(self, request):
        app_stats = App.objects.values('NomApp').annotate(rolecount=Count('id'))
        stats = {idApp['NomApp']: idApp['rolecount'] for idApp in app_stats}
        return Response(stats)
    @action(detail=False, methods=['get'])
    def total_App(self, request):
        total_rows = App.objects.count()
        return Response({'total_App': total_rows})
    


class PasswordView(viewsets.ModelViewSet):
    #permission requise
    permission_classes = [IsAuthenticatedOrDenied]

    queryset = Password.objects.all()
    serializer_class = PasswordSer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'Password', 'IdUser__id', 'IdApp__id', 'IdUser__Name']

    @action(detail=False, methods=['get'])
    def password_stats(self, request):
        password_stats = Password.objects.values('IdApp__id').annotate(rolecount=Count('id'))
        stats = {idApp['IdApp__id']: idApp['rolecount'] for idApp in password_stats}
        return Response(stats)
    