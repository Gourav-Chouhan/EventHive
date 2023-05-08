from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    # path('logout/', views.logout, name='logout'),
    path('add_event/', views.add_event, name='add_event'),
    path('hello/', views.hello ,name='hello'),
    path('get_events/', views.get_events, name='get_events'),
    path('like_event/', views.like_event, name='like_event'),
    path('get_user_events/', views.get_user_events, name='get_user_events'),
]
