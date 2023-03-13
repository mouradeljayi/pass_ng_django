# GenerateurMotDePasse_Backend
admin/: This pattern likely maps to Django's built-in admin interface.
^User/$ [name='user-list']: This pattern maps to a view that returns a list of all users. The name parameter is used to give the URL pattern a name that can be referenced in other parts of the code (such as when creating links).
^User\.(?P<format>[a-z0-9]+)/?$ [name='user-list']: This pattern is similar to the previous one, but includes an optional file extension (e.g. .json) in the URL. This allows clients to specify the desired format of the response (JSON, XML, etc.) by appending a file extension to the URL.
^User/role_stats/$ [name='user-role-stats']: This pattern maps to a view that returns statistics about user roles (e.g. the number of users in each role).
^User/role_stats\.(?P<format>[a-z0-9]+)/?$ [name='user-role-stats']: This is similar to the previous pattern, but includes an optional file extension.
^User/(?P<pk>[^/.]+)/$ [name='user-detail']: This pattern maps to a view that returns details about a specific user, identified by their primary key (pk). For example, /User/42/ would return details about the user with a primary key of 42.
^User/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$ [name='user-detail']: This is similar to the previous pattern, but includes an optional file extension.
^App/$ [name='app-list']: This pattern maps to a view that returns a list of all apps.
^App\.(?P<format>[a-z0-9]+)/?$ [name='app-list']: This is similar to the previous pattern, but includes an optional file extension.
^App/App_stats/$ [name='app-App-stats']: This pattern maps to a view that returns statistics about apps (e.g. the number of users who have installed each app).
^App/App_stats\.(?P<format>[a-z0-9]+)/?$ [name='app-App-stats']: This is similar to the previous pattern, but includes an optional file extension.
^App/(?P<pk>[^/.]+)/$ [name='app-detail']: This pattern maps to a view that returns details about a specific app, identified by its primary key.
^App/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$ [name='app-detail']: This is similar to the previous pattern, but includes an optional file extension.
^Password/$ [name='password-list']: This pattern maps to a view that returns a list of all passwords.
^Password\.(?P<format>[a-z0-9]+)/?$ [name='password-list']: This is similar to the previous pattern, but includes an optional file extension.
^Password/App_stats/$ [name='password-App-stats']: This pattern maps to a view that returns statistics about passwords (e.g. the number of users who have used each password).
^Password/App_stats\.(?P<format>[a-z0-9]+)/?$ [name='password-App-stats']: This is similar to the previous pattern, but includes an optional file
