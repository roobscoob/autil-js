// using btoa for cross-environment base64 translation, even though it is deprecated.
// TODO: consider replacing with better b64?

export class InnerslothHttpApi {
  static async backendGetUserUsername(idToken: string) {
    const res = await fetch("https://backend.innersloth.com/api/user/username", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + idToken,
      }
    });

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.json();
  }

  static async backendDeleteAccount(idToken: string) {
    const res = await fetch("https://backend.innersloth.com/api/user/accounts/deletion", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
      }
    });

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.text();
  }

  static async backendCancelDeleteAccount(idToken: string) {
    const res = await fetch("https://backend.innersloth.com/api/user/accounts/deletion", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + idToken,
      }
    })

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.text();
  }

  static async backendSetUserUsername(idToken: string, username: string) {
    const res = await fetch("https://backend.innersloth.com/api/user/username", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            "username": username,
            "recipient_puid": null,
            "recipient_friendcode": null
          },
          type: "change_username"
        }
      })
    })

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.json();
  }

  static async backendGetAnnouncement(lang: number = 0) {
    const res = await fetch(`https://backend.innersloth.com/api/announcement?id=0&lang=${lang}`);

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.json();
  }

  static async matchmakerGetToken(matchmakerBaseUrl: string, idToken: string, puid: string, clientVersion: number, language: number, username: string) {
    const res = await fetch(`${matchmakerBaseUrl}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain",
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify({
        Puid: puid,
        Username: username,
        ClientVersion: clientVersion,
        Language: language,
      }),
    });

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.text();
  }

  static async matchmakerFindHostServer(matchmakerBaseUrl: string, matchmakerToken: string): Promise<{ IP: number, port: number }> {
    const res = await fetch(`${matchmakerBaseUrl}/api/games`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        Authorization: "Bearer " + matchmakerToken,
      },
      body: new ArrayBuffer(1),
    });

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.json();
  }

  static async matchmakerFindGameByCode(matchmakerBaseUrl: string, matchmakerToken: string, gameId: number): Promise<{ IP: number, port: number }> {
    const res = await fetch(`${matchmakerBaseUrl}/api/games?gameId=` + gameId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        Authorization: "Bearer " + matchmakerToken,
      },
      body: ""
    });

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.json();
  }

  static async matchmakerFind(matchmakerBaseUrl: string, matchmakerToken: string, filters: {
    quickChat: "FreeChatOrQuickChat" | "QuickChatOnly",
    mapId?: number,
    lang?: number,
    platformFlags?: number,
    numImpostors?: number,
  }): Promise<{
    IP: number,
    Port: number,
    GameId: number,
    HostName: string,
    PlayerCount: number,
    Age: number,
    MapId: number,
    NumImpostors: number,
    MaxPlayers: number,
    Platform: number,
    HostPlatformName: number,
    Language: number,
  }[]> {
    const res = await fetch(`${matchmakerBaseUrl}/api/games?` + new URLSearchParams(filters as any).toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json",
        Authorization: "Bearer " + matchmakerToken,
      }
    });

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}: ${await res.text()}`);

    return res.json();
  }

  // static async backendGetUserFriends(idToken: string): Promise<
}
