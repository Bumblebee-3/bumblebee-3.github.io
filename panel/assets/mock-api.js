(function () {
  const storageKey = "aoi.panel.static.auth";
  const filesStorageKey = "aoi.panel.static.files";
  const logsStorageKey = "aoi.panel.static.logs";

  function now() {
    return Date.now();
  }

  function safeJSONParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (_err) {
      return fallback;
    }
  }

  function getAuth() {
    return localStorage.getItem(storageKey) || "demo-admin-demo-pass";
  }

  function setAuth(username, password) {
    const user = (username || "demo-admin").trim() || "demo-admin";
    const pass = (password || "demo-pass").trim() || "demo-pass";
    const token = user + "-" + pass;
    localStorage.setItem(storageKey, token);
    return token;
  }

  function defaultFiles() {
    return {
      "/workspace/index.js": [
        "const { AoiClient, LoadCommands } = require(\"aoi.js\");",
        "const { AoiVoice, PlayerEvents, PluginName, Cacher, Filter } = require(\"@akarui/aoi.music\");",
        "const { Panel } = require(\"@akarui/aoi.panel\");",
        "const config = require(\"./config.js\");",
        "",
        "const bot = new AoiClient(config.bot);//Your Bot Client",
        "config.panel.bot = bot;",
        "config.dash.bot = bot;",
        "",
        "/* HANDLERS */",
        "",
        "//Commands",
        "",
        "const fs = require('fs');",
        "",
        "",
        "const panel = new Panel(config.panel)",
        "panel.loadPanel()",
        "panel.onError()",
        "",
        "/* INTITALIZING PANEL */",
        "",
        "const voice = new AoiVoice(bot, config.music);",
        "voice.addPlugin(PluginName.Cacher, new Cacher(\"memory\" /* or \"disk\" */));",
        "voice.addPlugin( PluginName.Filter, new Filter( {",
        "    filterFromStart: false,",
        "}));"
      ].join("\n") + "\n",
      "/workspace/config.js": [
        "module.exports = {",
        "  \"bot\":{",
        "    \"token\":process.env[\"token\"],//bot token [secret, put it under .env]",
        "    \"prefix\":[\"bee \",\"$getGuildVar[prefix]\"],//bot prefix",
        "    \"intents\":[\"MessageContent\", \"Guilds\", \"GuildMessages\"],//intents for discord bot",
        "    \"events\":[\"onMessage\", \"onInteractionCreate\"],//events",
        "    \"mobilePlatform\":true//mobile presence",
        "  },",
        "  \"panel\":{",
        "    username: process.env[\"username\"],//panel login username",
        "    password: process.env[\"password\"],//panel login password",
        "    secret: require('crypto').randomBytes(16).toString(\"hex\"),",
        "    port: 3000,//panel port",
        "    mainFile: \"index.js\",//code mainfile name",
        "    commands: \"./commands/message commands/\",//message commands folder",
        "    interaction:\"./commands/slash commands/\",//slash commands folder",
        "    theme:\"orange\",//panel & dashboard theme",
        "    codetheme:\"gruvbox-dark\",//code editor theme",
        "    customIndex:\"adminLogin\"",
        "  },",
        "  \"dash\":{",
        "    clientId:\"1048543886156501022\",",
        "    clientSecret:process.env.secret,//available in discord.dev portal",
        "    redirectUri:\"https://aoijs-advanced.blurr1447.repl.co/redirect\",//needs to be updated on discord dev portal too!",
        "  },",
        "  \"music\":{",
        "  requestOptions: {",
        "    offsetTimeout: 0,",
        "    soundcloudLikeTrackLimit: 200,",
        "  },",
        "  searchOptions: {",
        "    soundcloudClientId: process.env.scID,",
        "    /*youtubeAuth: \"./auth.json\",",
        "    youtubegl: \"US\",*/",
        "  }",
        "}",
        "}"
      ].join("\n") + "\n",
      "/workspace/commands/eval.js": [
        "module.exports = [{",
        "  name:\"eval\",",
        "  aliases:[\"ev\"],",
        "  code:\`$title[Evaluated!]",
        "  $description[Evaluated Code]",
        "  $addField[**Input:**;\\\`$message\\\`]",
        "  $eval[$message]",
        "  $onlyForIds[$botOwnerID[;];818377414367379487;:x: You are not authorized to use this command!]",
        "  \`",
        "}]"
      ].join("\n") + "\n",
      "/workspace/commands/ping.js": [
        "module.exports = [{",
        "  name:\"ping\",",
        "  aliases:[\"p\",\"pong\"],",
        "  code:\`$title[Pong 🏓]",
        "  $description[Ping: \\\`$ping\\\`ms]",
        "  \`",
        "}]"
      ].join("\n") + "\n",
      "/workspace/commands/prefix.js": [
        "module.exports = {",
        "  name:\"prefix\",",
        "  code:\`",
        "  Changed the server prefix to \\\`$message\\\`",
        "  #setGuildVar[prefix;$message]\`",
        "}"
      ].join("\n") + "\n",
      "/workspace/README.md": "# Static AOI Panel Mock\\n\\nSeeded with your mock aoi.js project files for local panel testing.\\n"
    };
  }

  function normalizeFiles(files) {
    let changed = false;
    const normalized = {};

    Object.keys(files || {}).forEach(function (key) {
      let value = files[key];
      if (typeof value === "string" && value.indexOf("\\n") !== -1 && value.indexOf("\n") === -1) {
        value = value.replace(/\\n/g, "\n");
        changed = true;
      }
      normalized[key] = value;
    });

    return { files: normalized, changed: changed };
  }

  function loadFiles() {
    const stored = safeJSONParse(localStorage.getItem(filesStorageKey), null);
    if (stored && typeof stored === "object") {
      const migration = normalizeFiles(stored);
      if (migration.changed) {
        localStorage.setItem(filesStorageKey, JSON.stringify(migration.files));
      }
      return migration.files;
    }
    const fresh = defaultFiles();
    localStorage.setItem(filesStorageKey, JSON.stringify(fresh));
    return fresh;
  }

  function saveFiles(files) {
    localStorage.setItem(filesStorageKey, JSON.stringify(files));
  }

  function loadLogs() {
    const logs = safeJSONParse(localStorage.getItem(logsStorageKey), null);
    if (Array.isArray(logs)) {
      return logs;
    }
    const seed = [
      { date: now() - 60 * 1000, data: "demo-admin opened static panel" },
      { date: now() - 30 * 1000, data: "demo-admin loaded synthetic guild list" }
    ];
    localStorage.setItem(logsStorageKey, JSON.stringify(seed));
    return seed;
  }

  function saveLogs(logs) {
    localStorage.setItem(logsStorageKey, JSON.stringify(logs));
  }

  function addLog(data, type, ogcode, code) {
    const logs = loadLogs();
    const entry = { date: now(), data: data };
    if (type === "edit") {
      entry.type = "edit";
      entry.ogcode = ogcode;
      entry.code = code;
    }
    logs.push(entry);
    saveLogs(logs);
  }

  function parseBody(init) {
    if (!init || !init.body) {
      return {};
    }
    if (typeof init.body === "string") {
      return safeJSONParse(init.body, {});
    }
    return init.body;
  }

  function toResponse(payload, status) {
    return Promise.resolve(
      new Response(JSON.stringify(payload), {
        status: status || 200,
        headers: { "Content-Type": "application/json" }
      })
    );
  }

  function toPathEntries(files, rootDir) {
    const root = rootDir && rootDir !== "root" ? rootDir : "/workspace";
    const normalizedRoot = root.replace(/\\/g, "/").replace(/\/$/, "") || "/workspace";
    const filePaths = Object.keys(files).sort();
    const dirs = new Set();
    const entries = [];

    function parentDir(path) {
      const parts = path.split("/");
      parts.pop();
      return parts.join("/") || "/";
    }

    filePaths.forEach(function (path) {
      const dir = parentDir(path);
      if (dir !== normalizedRoot) {
        let cursor = dir;
        while (cursor && cursor.startsWith(normalizedRoot) && cursor !== normalizedRoot) {
          dirs.add(cursor);
          const next = parentDir(cursor);
          if (next === cursor) {
            break;
          }
          cursor = next;
        }
      }
    });

    dirs.forEach(function (dirPath) {
      if (parentDir(dirPath) === normalizedRoot) {
        entries.push({ path: dirPath, type: "dir", root: normalizedRoot });
      }
    });

    filePaths.forEach(function (filePath) {
      if (parentDir(filePath) === normalizedRoot) {
        entries.push({ path: filePath, type: "file", root: normalizedRoot });
      }
    });

    return entries.sort(function (a, b) {
      if (a.type !== b.type) {
        return a.type === "dir" ? -1 : 1;
      }
      return a.path.localeCompare(b.path);
    });
  }

  const sessionState = {
    bootAt: now()
  };

  const realFetch = window.fetch.bind(window);

  window.PANEL_STATIC = {
    getAuth: getAuth,
    setAuth: setAuth
  };

  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    const path = new URL(url, window.location.href).pathname;
    const body = parseBody(init);

    if (path === "/pass/validate") {
      const ok = Boolean(body.username && body.password);
      if (ok) {
        setAuth(body.username, body.password);
      }
      return toResponse({ data: ok });
    }

    if (!path.startsWith("/api")) {
      return realFetch(input, init);
    }

    const files = loadFiles();

    if (path === "/api") {
      return toResponse({
        usertag: "StaticPanel#2026",
        avatarURL: "https://cdn.discordapp.com/embed/avatars/0.png",
        id: "112233445566778899"
      });
    }

    if (path === "/api/stats") {
      const seconds = Math.floor((now() - sessionState.bootAt) / 1000);
      const minutes = Math.floor(seconds / 60) % 60;
      const hours = Math.floor(seconds / 3600) % 24;
      const days = Math.floor(seconds / 86400);
      return toResponse({
        ram: 150 + Math.random() * 40,
        uptime: days + "d " + hours + "h " + minutes + "m " + (seconds % 60) + "s ",
        cpu: (5 + Math.random() * 8).toFixed(2)
      });
    }

    if (path === "/api/guilds") {
      return toResponse([
        {
          id: "1001",
          name: "AOI Builders",
          iconURL: "https://cdn.discordapp.com/embed/avatars/1.png",
          members: Array(542)
        },
        {
          id: "1002",
          name: "Static Test Lab",
          iconURL: "https://cdn.discordapp.com/embed/avatars/2.png",
          members: Array(127)
        },
        {
          id: "1003",
          name: "Synthetic Sandbox",
          iconURL: "https://cdn.discordapp.com/embed/avatars/3.png",
          members: Array(73)
        }
      ]);
    }

    if (path === "/api/reboot") {
      sessionState.bootAt = now();
      addLog(getAuth().split("-")[0] + " rebooted the synthetic system");
      return toResponse({ msg: "rebooting system" });
    }

    if (path === "/api/shellexec") {
      if (!body.execute) {
        return toResponse({ error: "execute code not provided!" });
      }
      const command = String(body.execute).trim();
      addLog(getAuth().split("-")[0] + " executed a command: " + command);
      if (command === "pwd") {
        return toResponse({ data: "/workspace" });
      }
      if (command === "ls") {
        return toResponse({ data: Object.keys(files).join("<br>") });
      }
      return toResponse({ data: "[synthetic shell] command ran: " + command });
    }

    if (path === "/api/djseval") {
      if (!body.execute) {
        return toResponse({ err: "no code provided" });
      }
      return toResponse({ data: "[synthetic djs eval] " + body.execute });
    }

    if (path === "/api/aoieval") {
      if (!body.execute) {
        return toResponse({ error: "no code provided" });
      }
      return toResponse({ data: "[synthetic aoi eval] " + body.execute });
    }

    if (path === "/api/baseRoute") {
      return toResponse({ data: "/workspace" });
    }

    if (path === "/api/getAllLogs") {
      return toResponse(loadLogs());
    }

    if (path === "/api/getDelLogs") {
      const user = getAuth().split("-")[0];
      const logs = [{ date: now(), data: user + " cleared the logs." }];
      saveLogs(logs);
      return toResponse({ data: "success" });
    }

    if (path === "/api/dirs") {
      return toResponse(toPathEntries(files, body.dir));
    }

    if (path === "/api/file") {
      const f = body.file;
      if (!f) {
        return toResponse({ err: "file not provided" }, 404);
      }
      if (!Object.prototype.hasOwnProperty.call(files, f)) {
        return toResponse({ err: "file not found" }, 404);
      }
      return toResponse({ data: String(files[f]).split("\n") });
    }

    if (path === "/api/setFile") {
      if (!body.file) {
        return toResponse({ err: "file not provided" }, 404);
      }
      const prev = files[body.file] || "";
      files[body.file] = String(body.code || "");
      saveFiles(files);
      addLog(getAuth().split("-")[0] + " edited a file: " + body.file, "edit", prev, files[body.file]);
      return toResponse({ data: "success" });
    }

    if (path === "/api/createFile") {
      if (!body.filepath) {
        return toResponse({ data: "Error Occurred while creating file" }, 400);
      }
      files[body.filepath] = files[body.filepath] || "";
      saveFiles(files);
      addLog(getAuth().split("-")[0] + " created a file: " + body.filepath);
      return toResponse({ data: "Success!" });
    }

    if (path === "/api/deleteFile") {
      if (!body.file) {
        return toResponse({ data: "" }, 400);
      }
      delete files[body.file];
      saveFiles(files);
      addLog(getAuth().split("-")[0] + " deleted the file: " + body.file);
      return toResponse({ data: "Success!" });
    }

    if (path === "/api/deleteDir") {
      const dir = String(body.filepath || "");
      Object.keys(files).forEach(function (filePath) {
        if (filePath.startsWith(dir.replace(/\/$/, "") + "/")) {
          delete files[filePath];
        }
      });
      saveFiles(files);
      addLog(getAuth().split("-")[0] + " deleted a directory: " + dir);
      return toResponse({ data: "Success!" });
    }

    return toResponse({ error: "Mock route not implemented", route: path }, 404);
  };
})();
