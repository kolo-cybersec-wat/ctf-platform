FROM python:3.11

WORKDIR /opt/ctf-platform-backend

RUN pip install poetry==1.4.2

ENV POETRY_NO_INTERACTION 1
ENV POETRY_VIRTUALENVS_CREATE 0

COPY pyproject.toml poetry.lock ./

RUN poetry install --no-root

COPY ctf_platform_backend ctf_platform_backend

# needed for poetry
COPY README.md ./

RUN poetry install --only-root

COPY manage.py ./

COPY static static

COPY manage.py entrypoint.backend.sh ./

EXPOSE 8000

ENTRYPOINT ["/bin/sh", "-c"]

CMD ["sh ./entrypoint.backend.sh"]
