DOCKER_FILE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONTAINER_NAME=$(basename "${DOCKER_FILE_DIR}")
IMAGE_NAME="${CONTAINER_NAME}"
DOCKER_BIN="docker"
PORTS_MAP="-p 3001:3001 -p 11301:11301"

function dc_id {
    # Retorna o ID do container
    docker ps --filter="name=${CONTAINER_NAME}" -q
}

function dcbuild {
    # Faz build do container
    ${DOCKER_BIN} build -t "${IMAGE_NAME}" "${DOCKER_FILE_DIR}"
}

function dcrun {
    # Executa o comando no contaier ou inicia o container com comando default, deatached e portas mapeadas
    if [ "$(dc_id)" != "" ]; then
        dcexec "$@"
    else 
        if [ "$#" -ne 0 ]; then
            EXTRA_PARAM="-it --rm"  # se não é comando default, faz e maneira iterativa e depois apaga máquina
        else 
            EXTRA_PARAM="-d"
        fi 
        ${DOCKER_BIN} run --user "user:user" --name "${CONTAINER_NAME}"  -v "${DOCKER_FILE_DIR}":/usr/src/app ${PORTS_MAP} $EXTRA_PARAM "${IMAGE_NAME}" "$@"
    fi
}

function dcbash {
    # Executa um /bin/bash no container
    if [ "$(dc_id)" != "" ]; then
        dcexec /bin/bash
    else
        ${DOCKER_BIN} run --rm -it --user "user:user" -v "${DOCKER_FILE_DIR}":/usr/src/app "${IMAGE_NAME}" /bin/bash            
    fi
}

function dcdestroy {
    # Para e remove o container (docker stop && docker rm)
    ${DOCKER_BIN} stop "${CONTAINER_NAME}" && ${DOCKER_BIN} rm "${CONTAINER_NAME}"
}

function dclogs {
    # Mostra os logs do container (docker logs)
    ${DOCKER_BIN} logs "$@" "${CONTAINER_NAME}"
}

function dcrestart {
    # Reinicializa o container (docker restart)
    ${DOCKER_BIN} restart "${CONTAINER_NAME}"
}

function dcexec {
    # Executa um comando no container (docker exec)
    ${DOCKER_BIN} exec -it --user "user:user" "${CONTAINER_NAME}" "$@"
}

function npm {
    # Executa o npm no container (npm)
    dcrun npm "$@"
}

function bower {
    # Executa o bower no container (bower)
    dcrun bower "$@"
}


function dcaliases {
    # Mostra (essa) lista de aliases do projeto
    grep '^function' -A 1 "${DOCKER_FILE_DIR}/activate.sh"
}