FROM postgres:15.0
ENV POSTGRES_PASSWORD root
ENV POSTGRES_DB main
ENV PGDATA=/var/lib/postgresql/data/pgdata