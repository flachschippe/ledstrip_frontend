import {LedstripAnimation} from "@/models/Animation"
import {Parameter} from "@/models/Parameter";

function getBackendUrl(): string {
    let port = ""
    if(!(location.port === "80" && location.protocol === "http:" ||
        location.port === "443" && location.protocol === "https:"))
    {
        port = location.port
    }
    return process.env.VUE_APP_BACKEND_URL
        .replace('_PROTOCOL_', window.location.protocol)
        .replace('_HOSTNAME_', window.location.hostname)
        .replace('_PORT_', ":" + port)
}

export function stopAnimation(animationId: number): Promise<Response> {
    return fetch(getBackendUrl() + '/animation/' + animationId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    })
}

export function sendAnimation(animation: LedstripAnimation): Promise<Response> {
    return fetch(getBackendUrl() + '/animation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(animation),
    });
}

function createParameters(parameters: object): Parameter[] {
    const result: Parameter[] = []
    for (const [name, value] of Object.entries(parameters)) {
        result.push(new Parameter(name, value.value, value.type, value.minimum, value.maximum))
    }
    return result
}

export function getActiveAnimations(): Promise<LedstripAnimation[][]> {
    console.log(getBackendUrl())
    return fetch(getBackendUrl() + '/animations', {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            const availableAnimations: LedstripAnimation[] = [];
            const activeAnimations: LedstripAnimation[] = [];
            for (const animation of data.available_animations) {
                availableAnimations.push(
                    new LedstripAnimation(
                        animation.name,
                        createParameters(animation.parameters),
                        animation.id
                    )
                );
            }
            for (const animation of data.active_animations) {
                activeAnimations.push(
                    new LedstripAnimation(
                        animation.name,
                        createParameters(animation.parameters),
                        animation.id
                    )
                );
            }
            return [availableAnimations, activeAnimations]
        });
}