import {LedstripAnimation} from "@/models/Animation"

function getBackendUrl(): string
{
    console.log(process.env)
    return process.env.VUE_APP_BACKEND_URL
}

export function stopAnimation(animationId: number): Promise<Response>
{
  return fetch(getBackendUrl() + '/animation/' + animationId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      })
}

export function sendAnimation(animation: LedstripAnimation): Promise<Response>
{
  return fetch(getBackendUrl() + '/animation', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },     
    body: JSON.stringify(animation),
  });
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
              animation.parameters,
              animation.id
            )
          );
        }
        for (const animation of data.active_animations) {
          activeAnimations.push(
            new LedstripAnimation(
              animation.name,
              animation.parameters,
              animation.id
            )
          );
        }
        return [availableAnimations, activeAnimations]
      });
  }