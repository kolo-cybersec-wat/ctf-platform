import logging

from django.contrib.auth import login, logout
from rest_framework import permissions, status
from rest_framework import views
from rest_framework.response import Response

from . import serializers


class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response(
            {
                "success": True,
            },
            status=status.HTTP_202_ACCEPTED,
        )


class SessionView(views.APIView):
    def get(self, request, format=None):
        user = request.user
        logging.log(logging.ERROR, user.is_authenticated)
        logging.log(logging.ERROR, user.username)
        if user.is_authenticated:
            return Response(
                {
                    "username": user.username,
                    "is_authenticated": True,
                }
            )
        else:
            return Response(
                {
                    "is_authenticated": False,
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )


class LogoutView(views.APIView):
    def post(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            logout(request)
            return Response(
                {
                    "success": True,
                },
                status=status.HTTP_202_ACCEPTED,
            )
        else:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
