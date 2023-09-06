from django.urls import path
from . import views

urlpatterns = [
    path('api/signup/', views.signup, name='signup'),
    path('api/signin/', views.signin, name='signin'),
    path('api/add_event/', views.add_event, name='add_event'),
    path('api/hello/', views.hello ,name='hello'),
    path('api/get_events/', views.get_events, name='get_events'),
    path('api/like_event/', views.like_event, name='like_event'),
    path('api/get_user_events/', views.get_user_events, name='get_user_events'),
]
