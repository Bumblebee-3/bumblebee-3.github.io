(function () {
  const STORAGE_KEY = "persev.static.v1";

  const leaderboardEvents = [
    "Admeta: Category 1",
    "Admeta: Category 2",
    "Artem",
    "Carmen: Category 1",
    "Carmen: Category 2",
    "Fabula",
    "Fortuna",
    "Codeferno",
    "Gustatio",
    "Mahim 16",
    "'Ad'venturium",
    "Gratia",
    "Panache",
    "Symphonia",
    "Mr. and Mrs. Perseverantia",
    "Explorare",
    "Monopolium",
    "Football: U17 Boys",
    "Football: U19 Boys",
    "Football: U19 Girls",
    "Basketball: U19 Girls",
    "Basketball: U19 Boys",
    "Gully Cricket",
    "Table Tennis",
    "Tug of War: U16 Boys",
    "Tug of War: U16 Girls",
    "Tug of War: U19 Boys",
    "Tug of War: U19 Girls",
    "E-Sports"
  ];

  const leaderboardSchools = [
    "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
    "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P20",
    "P21", "P22", "P23", "P24", "P25", "P26", "P28", "P29"
  ];

  function seedLeaderboard() {
    const schools = leaderboardSchools.map(function (name, idx) {
      const eventpoints = leaderboardEvents.map(function (_, eventIndex) {
        return idx < 4 && eventIndex % (idx + 3) === 0 ? 20 : 0;
      });
      const points = eventpoints.reduce(function (a, b) { return a + b; }, 0);
      return {
        name: name,
        points: points,
        events: leaderboardEvents.slice(),
        eventpoints: eventpoints
      };
    });
    return {
      schools: schools,
      eventEnd: false
    };
  }

  function seedUsers() {
    const users = {};
    for (let i = 1; i <= 10; i++) {
      users["user" + i] = {
        username: "user" + i,
        password: "pass" + i,
        name: "School " + i,
        contingentCode: "P" + i,
        teacherName: "Teacher " + i,
        teacherMobile: "90000000" + (i < 10 ? "0" + i : i),
        teacherEmail: "school" + i + "@example.com"
      };
    }
    users.admin = {
      username: "admin",
      password: "admin123",
      name: "Admin",
      contingentCode: "ADMIN"
    };
    return users;
  }

  function seedState() {
    return {
      users: seedUsers(),
      session: {
        username: "",
        loggedIn: false
      },
      admin: {
        username: "admin",
        password: "admin123",
        authenticated: false
      },
      registrations: {
        stage: {},
        sports: {},
        classroom: {}
      },
      leaderboard: seedLeaderboard()
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seeded = seedState();
        saveState(seeded);
        return seeded;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid state");
      }
      return parsed;
    } catch (err) {
      const seeded = seedState();
      saveState(seeded);
      return seeded;
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function normalizePath(pathname) {
    if (pathname.startsWith("/persev/")) {
      return pathname.slice(7);
    }
    if (pathname === "/persev") {
      return "/";
    }
    return pathname;
  }

  function getCurrentUser(state) {
    if (!state.session || !state.session.loggedIn || !state.session.username) {
      return null;
    }
    return state.users[state.session.username] || null;
  }

  function jsonResponse(payload, status) {
    return new Response(JSON.stringify(payload), {
      status: status || 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  function parseBody(init) {
    const body = init && init.body;
    if (!body) {
      return {};
    }
    if (typeof body === "string") {
      try {
        return JSON.parse(body);
      } catch (_e) {
        const params = new URLSearchParams(body);
        const out = {};
        params.forEach(function (value, key) { out[key] = value; });
        return out;
      }
    }
    return body;
  }

  function getUserSchool(state, username) {
    const user = state.users[username];
    if (!user) {
      return null;
    }
    return {
      _id: username,
      name: user.name,
      contingentCode: user.contingentCode,
      teacherName: user.teacherName || "",
      teacherMobile: user.teacherMobile || "",
      teacherEmail: user.teacherEmail || ""
    };
  }

  function calculateRegistrationStats(state) {
    const stageCount = Object.values(state.registrations.stage).reduce(function (sum, item) {
      return sum + (item.events ? item.events.length : 0);
    }, 0);
    const sportsCount = Object.values(state.registrations.sports).reduce(function (sum, item) {
      return sum + (item.events ? item.events.length : 0);
    }, 0);
    const classroomCount = Object.values(state.registrations.classroom).reduce(function (sum, item) {
      return sum + (item.events ? item.events.length : 0);
    }, 0);

    return {
      totalRegistrations: stageCount + sportsCount + classroomCount,
      totalStageRegistrations: stageCount,
      totalSportsRegistrations: sportsCount,
      totalClassroomRegistrations: classroomCount,
      totalSchools: Object.keys(state.users).filter(function (u) { return u !== "admin"; }).length
    };
  }

  function calculateParticipantStats(state) {
    const stage = Object.values(state.registrations.stage).reduce(function (sum, item) {
      return sum + (item.events || []).reduce(function (inner, ev) {
        return inner + ((ev.participants || []).length);
      }, 0);
    }, 0);

    const sports = Object.values(state.registrations.sports).reduce(function (sum, item) {
      return sum + (item.events || []).reduce(function (inner, ev) {
        return inner + ((ev.participants || []).length);
      }, 0);
    }, 0);

    const classroom = Object.values(state.registrations.classroom).reduce(function (sum, item) {
      return sum + (item.events || []).reduce(function (inner, ev) {
        return inner + ((ev.participants || []).length);
      }, 0);
    }, 0);

    return {
      totalParticipants: stage + sports + classroom,
      breakdown: {
        stage: stage,
        sports: sports,
        classroom: classroom
      }
    };
  }

  function groupForAdmin(bucket) {
    return Object.values(bucket).map(function (entry) {
      return {
        school: {
          name: entry.school.name,
          contingentCode: entry.school.contingentCode,
          teacherName: entry.school.teacherName,
          teacherEmail: entry.school.teacherEmail,
          teacherMobile: entry.school.teacherMobile
        },
        events: (entry.events || []).map(function (ev) {
          return {
            eventName: ev.eventName || ev.eventId,
            participants: ev.participants || []
          };
        })
      };
    });
  }

  function buildAdminSummary(state) {
    const grouped = [
      groupForAdmin(state.registrations.stage),
      groupForAdmin(state.registrations.sports),
      groupForAdmin(state.registrations.classroom)
    ];

    const eventMap = {};
    const schoolMap = {};

    grouped.forEach(function (bucket) {
      bucket.forEach(function (schoolEntry) {
        const sname = schoolEntry.school.name;
        if (!schoolMap[sname]) {
          schoolMap[sname] = { totalEvents: 0, totalParticipants: 0 };
        }

        schoolEntry.events.forEach(function (event) {
          if (!eventMap[event.eventName]) {
            eventMap[event.eventName] = { participantCount: 0, schools: new Set() };
          }
          const pCount = (event.participants || []).length;
          eventMap[event.eventName].participantCount += pCount;
          eventMap[event.eventName].schools.add(sname);

          schoolMap[sname].totalEvents += 1;
          schoolMap[sname].totalParticipants += pCount;
        });
      });
    });

    const eventSummary = Object.keys(eventMap).map(function (name) {
      return {
        eventName: name,
        participantCount: eventMap[name].participantCount,
        schoolCount: eventMap[name].schools.size
      };
    }).sort(function (a, b) { return b.participantCount - a.participantCount; });

    const schoolSummary = Object.keys(schoolMap).map(function (name) {
      return {
        schoolName: name,
        totalEvents: schoolMap[name].totalEvents,
        totalParticipants: schoolMap[name].totalParticipants
      };
    }).sort(function (a, b) { return b.totalParticipants - a.totalParticipants; });

    return { eventSummary: eventSummary, schoolSummary: schoolSummary };
  }

  function validLbAdmin(state, uname, pass) {
    return uname === state.admin.username && pass === state.admin.password;
  }

  window.PersevStaticAuth = {
    validateSchoolLogin: function (username, password) {
      const state = loadState();
      const user = state.users[username];
      if (!user || user.password !== password || username === "admin") {
        return false;
      }
      state.session.username = username;
      state.session.loggedIn = true;
      saveState(state);
      return true;
    },
    isSchoolLoggedIn: function () {
      const state = loadState();
      return !!getCurrentUser(state);
    },
    schoolLogout: function () {
      const state = loadState();
      state.session.username = "";
      state.session.loggedIn = false;
      saveState(state);
    },
    adminLogout: function () {
      const state = loadState();
      state.admin.authenticated = false;
      saveState(state);
    },
    isAdminLoggedIn: function () {
      const state = loadState();
      try {
        if (localStorage && localStorage.getItem && localStorage.getItem('persev.admin.auth') === '1') return true;
      } catch (e) {}
      return !!state.admin.authenticated;
    }
  };

  const nativeFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    const req = new Request(input, init);
    const url = new URL(req.url, window.location.origin);
    const path = normalizePath(url.pathname);
    const method = (req.method || "GET").toUpperCase();

    let state = loadState();
    const currentUser = getCurrentUser(state);

    if (path === "/persev/config.json") {
      return nativeFetch("/persev/config.json", init);
    }

    if (path === "/pass/validate/" && method === "POST") {
      const body = parseBody(init || {});
      const user = state.users[body.username];
      const ok = !!(user && user.password === body.password);
      return Promise.resolve(jsonResponse({ data: ok }));
    }

    if (path === "/api/user/school-info" && method === "GET") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ message: "School information not found for user" }, 404));
      }
      return Promise.resolve(jsonResponse({ name: currentUser.name, contingentCode: currentUser.contingentCode }));
    }

    if (path === "/api/participating-schools" && method === "GET") {
      const count = Object.keys(state.users).filter(function (k) { return k !== "admin"; }).length;
      return Promise.resolve(jsonResponse({ count: count }));
    }

    if (path === "/api/stats/registrations" && method === "GET") {
      return Promise.resolve(jsonResponse(calculateRegistrationStats(state)));
    }

    if (path === "/api/stats/participants" && method === "GET") {
      return Promise.resolve(jsonResponse(calculateParticipantStats(state)));
    }

    if (path === "/api/check-stage-registration" && method === "GET") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ hasRegistration: false }));
      }
      const reg = state.registrations.stage[currentUser.username];
      if (!reg) {
        return Promise.resolve(jsonResponse({ hasRegistration: false }));
      }
      const registrations = (reg.events || []).map(function (ev, idx) {
        return {
          _id: idx + 1,
          eventId: ev.eventId,
          participants: ev.participants || [],
          eventIdPopulated: { name: ev.eventName || String(ev.eventId) }
        };
      });
      return Promise.resolve(jsonResponse({ hasRegistration: registrations.length > 0, school: reg.school, registrations: registrations }));
    }

    if (path === "/api/check-sports-registration" && method === "GET") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ hasRegistration: false }));
      }
      const reg = state.registrations.sports[currentUser.username];
      if (!reg) {
        return Promise.resolve(jsonResponse({ hasRegistration: false }));
      }
      const registrations = (reg.events || []).map(function (ev, idx) {
        return {
          _id: idx + 1,
          eventId: ev.eventId,
          eventName: ev.eventName || String(ev.eventId),
          participants: ev.participants || []
        };
      });
      return Promise.resolve(jsonResponse({ hasRegistration: registrations.length > 0, school: reg.school, registrations: registrations }));
    }

    if (path === "/api/check-classroom-registration" && method === "GET") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ hasRegistration: false }));
      }
      const reg = state.registrations.classroom[currentUser.username];
      if (!reg) {
        return Promise.resolve(jsonResponse({ hasRegistration: false }));
      }
      const registrations = (reg.events || []).map(function (ev, idx) {
        return {
          _id: idx + 1,
          eventId: ev.eventId,
          eventName: ev.eventName || String(ev.eventId),
          participants: ev.participants || []
        };
      });
      return Promise.resolve(jsonResponse({ hasRegistration: registrations.length > 0, school: reg.school, registrations: registrations }));
    }

    if (path === "/api/register/stage" && method === "POST") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ message: "Login required" }, 401));
      }
      const body = parseBody(init || {});
      const school = Object.assign({}, getUserSchool(state, currentUser.username), body.school || {});
      const events = (body.events || []).map(function (ev) {
        return {
          eventId: ev.eventId,
          eventName: String(ev.eventId),
          participants: ev.participants || []
        };
      });
      state.users[currentUser.username].teacherName = school.teacherName || "";
      state.users[currentUser.username].teacherMobile = school.teacherMobile || "";
      state.users[currentUser.username].teacherEmail = school.teacherEmail || "";
      state.registrations.stage[currentUser.username] = { school: school, events: events };
      saveState(state);
      return Promise.resolve(jsonResponse({ message: "Registration completed successfully", schoolId: currentUser.username, eventsRegistered: events.length }, 201));
    }

    if (path === "/api/register/sports" && method === "POST") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ message: "Login required" }, 401));
      }
      const body = parseBody(init || {});
      const school = Object.assign({}, getUserSchool(state, currentUser.username), body.school || {});
      const events = (body.events || []).map(function (ev) {
        return {
          eventId: ev.eventId,
          eventName: String(ev.eventId).replace(/-/g, " "),
          participants: ev.participants || []
        };
      });
      state.users[currentUser.username].teacherName = school.teacherName || "";
      state.users[currentUser.username].teacherMobile = school.teacherMobile || "";
      state.users[currentUser.username].teacherEmail = school.teacherEmail || "";
      state.registrations.sports[currentUser.username] = { school: school, events: events };
      saveState(state);
      return Promise.resolve(jsonResponse({ message: "Sports registration completed successfully", schoolId: currentUser.username, eventsRegistered: events.length }, 201));
    }

    if (path === "/api/register/classroom" && method === "POST") {
      if (!currentUser) {
        return Promise.resolve(jsonResponse({ message: "Login required" }, 401));
      }
      const body = parseBody(init || {});
      const school = Object.assign({}, getUserSchool(state, currentUser.username), body.school || {});
      const events = (body.events || []).map(function (ev) {
        return {
          eventId: ev.eventId,
          eventName: String(ev.eventId),
          participants: ev.participants || []
        };
      });
      state.users[currentUser.username].teacherName = school.teacherName || "";
      state.users[currentUser.username].teacherMobile = school.teacherMobile || "";
      state.users[currentUser.username].teacherEmail = school.teacherEmail || "";
      state.registrations.classroom[currentUser.username] = { school: school, events: events };
      saveState(state);
      return Promise.resolve(jsonResponse({ message: "Classroom events registration successful", schoolId: currentUser.username, registeredEvents: events.length }));
    }

    if (path === "/admin/login" && method === "POST") {
      const body = parseBody(init || {});
      const ok = body.username === state.admin.username && body.password === state.admin.password;
      if (!ok) {
        return Promise.resolve(jsonResponse({ success: false, message: "Invalid credentials" }, 401));
      }
      state.admin.authenticated = true;
      saveState(state);
      return Promise.resolve(jsonResponse({ success: true, message: "Login successful" }));
    }

    if (path === "/admin/check-auth" && method === "GET") {
      const isStaticAuth = localStorage.getItem('persev.admin.auth') === '1';
      return Promise.resolve(jsonResponse({ authenticated: !!state.admin.authenticated || isStaticAuth }));
    }

    if (path === "/admin/logout" && method === "GET") {
      state.admin.authenticated = false;
      saveState(state);
      return Promise.resolve(jsonResponse({ success: true }));
    }

    if (path === "/admin/api/registrations/stage" && method === "GET") {
      const isStaticAuth = localStorage.getItem('persev.admin.auth') === '1';
      if (!state.admin.authenticated && !isStaticAuth) {
        return Promise.resolve(jsonResponse({ message: "Admin authentication required" }, 401));
      }
      return Promise.resolve(jsonResponse(groupForAdmin(state.registrations.stage)));
    }

    if (path === "/admin/api/registrations/sports" && method === "GET") {
      const isStaticAuth = localStorage.getItem('persev.admin.auth') === '1';
      if (!state.admin.authenticated && !isStaticAuth) {
        return Promise.resolve(jsonResponse({ message: "Admin authentication required" }, 401));
      }
      return Promise.resolve(jsonResponse(groupForAdmin(state.registrations.sports)));
    }

    if (path === "/admin/api/registrations/classroom" && method === "GET") {
      const isStaticAuth = localStorage.getItem('persev.admin.auth') === '1';
      if (!state.admin.authenticated && !isStaticAuth) {
        return Promise.resolve(jsonResponse({ message: "Admin authentication required" }, 401));
      }
      return Promise.resolve(jsonResponse(groupForAdmin(state.registrations.classroom)));
    }

    if (path === "/admin/api/summary" && method === "GET") {
      const isStaticAuth = localStorage.getItem('persev.admin.auth') === '1';
      if (!state.admin.authenticated && !isStaticAuth) {
        return Promise.resolve(jsonResponse({ message: "Admin authentication required" }, 401));
      }
      return Promise.resolve(jsonResponse(buildAdminSummary(state)));
    }

    if (path === "/api/lb/info" && method === "GET") {
      const points = state.leaderboard.schools.map(function (s) { return s.points; });
      return Promise.resolve(jsonResponse({
        schools: leaderboardSchools.slice(),
        events: leaderboardEvents.slice(),
        points: points,
        eventEnd: !!state.leaderboard.eventEnd
      }));
    }

    if (path === "/api/lb/full" && method === "GET") {
      return Promise.resolve(jsonResponse({
        schools: state.leaderboard.schools,
        eventEnd: !!state.leaderboard.eventEnd
      }));
    }

    if (path === "/api/lb/add" && method === "GET") {
      const uname = url.searchParams.get("uname");
      const pass = url.searchParams.get("pass");
      const school = url.searchParams.get("school");
      const event = url.searchParams.get("event");
      const points = parseInt(url.searchParams.get("points") || "0", 10);
      if (!validLbAdmin(state, uname, pass)) {
        return Promise.resolve(jsonResponse({ success: false }));
      }
      const schoolObj = state.leaderboard.schools.find(function (s) { return s.name === school; });
      const eventIdx = leaderboardEvents.indexOf(event);
      if (schoolObj && eventIdx >= 0 && Number.isFinite(points)) {
        schoolObj.eventpoints[eventIdx] += points;
        schoolObj.points += points;
        saveState(state);
      }
      return Promise.resolve(jsonResponse({ success: true }));
    }

    if (path === "/api/lb/rem" && method === "GET") {
      const uname = url.searchParams.get("uname");
      const pass = url.searchParams.get("pass");
      const school = url.searchParams.get("school");
      const event = url.searchParams.get("event");
      const points = parseInt(url.searchParams.get("points") || "0", 10);
      if (!validLbAdmin(state, uname, pass)) {
        return Promise.resolve(jsonResponse({ success: false }));
      }
      const schoolObj = state.leaderboard.schools.find(function (s) { return s.name === school; });
      const eventIdx = leaderboardEvents.indexOf(event);
      if (!schoolObj || eventIdx < 0 || !Number.isFinite(points) || schoolObj.eventpoints[eventIdx] < points) {
        return Promise.resolve(jsonResponse({ success: false }));
      }
      schoolObj.eventpoints[eventIdx] -= points;
      schoolObj.points -= points;
      saveState(state);
      return Promise.resolve(jsonResponse({ success: true }));
    }

    if (path === "/api/lb/reset" && method === "GET") {
      const uname = url.searchParams.get("uname");
      const pass = url.searchParams.get("pass");
      if (!validLbAdmin(state, uname, pass)) {
        return Promise.resolve(jsonResponse({ success: false }));
      }
      state.leaderboard = seedLeaderboard();
      saveState(state);
      return Promise.resolve(jsonResponse({ success: true }));
    }

    if (path === "/api/lb/endEvent" && method === "GET") {
      const uname = url.searchParams.get("uname");
      const pass = url.searchParams.get("pass");
      if (!validLbAdmin(state, uname, pass)) {
        return Promise.resolve(jsonResponse({ success: false }));
      }
      state.leaderboard.eventEnd = true;
      saveState(state);
      return Promise.resolve(jsonResponse({ success: true }));
    }

    if (path === "/api/lb/eventStart" && method === "GET") {
      const uname = url.searchParams.get("uname");
      const pass = url.searchParams.get("pass");
      if (!validLbAdmin(state, uname, pass)) {
        return Promise.resolve(jsonResponse({ success: false }));
      }
      state.leaderboard.eventEnd = false;
      saveState(state);
      return Promise.resolve(jsonResponse({ success: true }));
    }

    return nativeFetch(input, init);
  };
})();
