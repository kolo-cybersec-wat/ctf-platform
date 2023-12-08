from django.urls import path
from ctf_platform_backend.api_auth.views import LoginView, SessionView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('session/', SessionView.as_view()),
    path('logout/', LogoutView.as_view()),
]
