(function () {
  const lanes = {
    setup: "Setup and evidence",
    viewing: "Viewing and analysis",
    festival: "Festival entry",
    public: "Public discussion",
    handoff: "Agent handoff"
  };

  const sharedReviewQuestions = [
    "What is the film claiming?",
    "What is shown, implied, omitted or uncertain?",
    "Which scenes carry the strongest evidence?",
    "What source trail does this point toward?",
    "What belongs in a public page and what should stay private?"
  ];

  const builders = [
    builder({
      key: "film-profile",
      page: "film-profile.html",
      label: "Film Profile",
      title: "Film profile builder",
      heading: "Create a documentary profile before deeper notes scatter.",
      lane: lanes.setup,
      prefix: "film-profile",
      destination: "Save to drafts/film-profiles/ or the relevant film folder.",
      note: "Title, claim, makers, representation, gaps and source starting points.",
      art: "../assets/img/film-poster.webp",
      titleField: "filmTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("filmTitle", "Film title"),
        text("year", "Year / release window"),
        text("directorTeam", "Director / production team"),
        text("format", "Format or version watched", "Feature documentary, series episode, short film, festival cut, rough cut."),
        date("watchedDate", "Date watched"),
        text("whereWatched", "Where / how watched"),
        area("coreClaim", "What is the film claiming?", "Write the main claim in plain language."),
        area("publicSynopsis", "Plain synopsis"),
        area("makersContext", "Who made this and from what position?"),
        area("represented", "Who is represented?"),
        area("missing", "Who or what seems missing?"),
        area("sourceStartingPoints", "Source starting points", "Links, credits, interviews, articles, archives, people or places to check."),
        area("publicPrivate", "Public/private boundary"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Film", ["filmTitle", "year", "directorTeam", "format", "watchedDate", "whereWatched"]),
        sec("What The Film Is Claiming", "coreClaim"),
        sec("Plain Synopsis", "publicSynopsis"),
        sec("Makers And Position", "makersContext"),
        sec("Who Is Represented", "represented"),
        sec("Who Or What Is Missing", "missing"),
        list("Source Starting Points", "sourceStartingPoints"),
        sec("Public / Private Boundary", "publicPrivate"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: sharedReviewQuestions
    }),
    builder({
      key: "viewing-notes",
      page: "viewing-notes.html",
      label: "Viewing Notes",
      title: "Viewing notes builder",
      heading: "Capture the viewing while the evidence is still fresh.",
      lane: lanes.viewing,
      prefix: "viewing-notes",
      destination: "Save to drafts/viewing-notes/ or the relevant film folder.",
      note: "Use after a full viewing, rough cut, screening copy or completed film.",
      art: "../assets/img/film-reel.webp",
      titleField: "filmTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "private working note"),
        text("filmTitle", "Film title"),
        date("viewingDate", "Viewing date"),
        text("sessionContext", "Viewing context", "Solo watch, group screening, rewatch, clip review, class session."),
        area("firstReaction", "First reaction"),
        area("claimNotes", "What claims stood out?"),
        area("shown", "What is shown?"),
        area("implied", "What is implied?"),
        area("omitted", "What is omitted or uncertain?"),
        area("strongestScenes", "Strongest evidence scenes", "One per line is fine."),
        area("questions", "Questions to carry forward"),
        area("sourceTrail", "Source trail suggested by the viewing"),
        area("publicPrivate", "Public/private boundary"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Viewing Context", ["filmTitle", "viewingDate", "sessionContext"]),
        sec("First Reaction", "firstReaction"),
        sec("Claims That Stood Out", "claimNotes"),
        sec("What Is Shown", "shown"),
        sec("What Is Implied", "implied"),
        sec("What Is Omitted Or Uncertain", "omitted"),
        list("Strongest Evidence Scenes", "strongestScenes"),
        list("Questions To Carry Forward", "questions"),
        list("Source Trail Suggested", "sourceTrail"),
        sec("Public / Private Boundary", "publicPrivate"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: sharedReviewQuestions
    }),
    builder({
      key: "scene-analysis",
      page: "scene-analysis.html",
      label: "Scene Analysis",
      title: "Scene analysis builder",
      heading: "Separate what the scene proves from what it only makes us feel.",
      lane: lanes.viewing,
      prefix: "scene-analysis",
      destination: "Save to drafts/scene-analysis/.",
      note: "Timestamp, evidence, implication, uncertainty, film language and public use.",
      art: "../assets/img/on-air-camera.webp",
      titleField: "sceneTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("sceneTitle", "Scene title or short label"),
        text("filmTitle", "Film title"),
        text("timestamp", "Timestamp / sequence"),
        area("whatHappens", "What happens in the scene?"),
        area("evidenceShown", "Evidence shown on screen"),
        area("impliedMeaning", "What is implied?"),
        area("filmLanguage", "Film language", "Editing, framing, music, silence, archive, performance, graphics or voiceover."),
        area("uncertainty", "What remains uncertain?"),
        area("sourceTrail", "Source trail this scene points toward"),
        area("discussionUse", "Use for discussion, article, episode or workshop"),
        area("publicPrivate", "Public/private boundary"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Scene", ["sceneTitle", "filmTitle", "timestamp"]),
        sec("What Happens", "whatHappens"),
        sec("Evidence Shown", "evidenceShown"),
        sec("Implied Meaning", "impliedMeaning"),
        sec("Film Language", "filmLanguage"),
        sec("What Remains Uncertain", "uncertainty"),
        list("Source Trail", "sourceTrail"),
        sec("Discussion / Article / Workshop Use", "discussionUse"),
        sec("Public / Private Boundary", "publicPrivate"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: sharedReviewQuestions
    }),
    builder({
      key: "character-subject",
      page: "character-subject.html",
      label: "Character / Subject",
      title: "Character / subject builder",
      heading: "Track how a real person or group is represented.",
      lane: lanes.viewing,
      prefix: "subject",
      destination: "Save to drafts/subjects/.",
      note: "Representation, voice, agency, risk, missing context and interview questions.",
      art: "../assets/img/research-detective.webp",
      titleField: "subjectName",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "private working note"),
        text("subjectName", "Person, group or character"),
        text("filmTitle", "Film title"),
        area("roleInFilm", "Role in the film"),
        area("representedHow", "How are they represented?"),
        area("voiceAgency", "Voice and agency", "Do they speak for themselves? Who frames their story?"),
        area("missingContext", "Missing context or counterpoint"),
        area("powerAndRisk", "Power, consent, safety or dignity risks"),
        area("sourceNeeds", "Source or fact-check needs"),
        area("interviewQuestion", "Question we would ask them or about them"),
        area("publicPrivate", "Public/private boundary"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Subject", ["subjectName", "filmTitle"]),
        sec("Role In The Film", "roleInFilm"),
        sec("Representation", "representedHow"),
        sec("Voice And Agency", "voiceAgency"),
        sec("Missing Context Or Counterpoint", "missingContext"),
        sec("Power Consent Safety Or Dignity Risks", "powerAndRisk"),
        list("Source Or Fact-Check Needs", "sourceNeeds"),
        sec("Question To Ask", "interviewQuestion"),
        sec("Public / Private Boundary", "publicPrivate"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "Who is represented here?",
        "Who gets voice and agency?",
        "Who is missing?",
        "What would we ask the person, critic, local expert or audience?",
        "What should stay private until reviewed?"
      ]
    }),
    builder({
      key: "theme-motif",
      page: "theme-motif.html",
      label: "Theme And Motif",
      title: "Theme and motif builder",
      heading: "Turn repeated ideas and images into testable discussion notes.",
      lane: lanes.viewing,
      prefix: "theme-motif",
      destination: "Save to drafts/themes/.",
      note: "Themes, motifs, repeated images, counter-evidence and audience questions.",
      art: "../assets/img/film-reel.webp",
      titleField: "themeName",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("themeName", "Theme or motif"),
        text("filmTitle", "Film title"),
        area("motifExamples", "Where it appears", "Scenes, lines, objects, music cues, archive material or recurring images."),
        area("claimConnection", "How it connects to the film claim"),
        area("repeatedImages", "Repeated images or sounds"),
        area("counterEvidence", "Counter-evidence, tension or complication"),
        area("audienceQuestions", "Audience questions"),
        area("sourceNeeds", "Source trail or reading needed"),
        area("publicUse", "Public discussion or article use"),
        area("publicPrivate", "Public/private boundary"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Theme Or Motif", ["themeName", "filmTitle"]),
        list("Where It Appears", "motifExamples"),
        sec("Connection To The Film Claim", "claimConnection"),
        list("Repeated Images Or Sounds", "repeatedImages"),
        sec("Counter-Evidence Or Tension", "counterEvidence"),
        list("Audience Questions", "audienceQuestions"),
        list("Source Trail Or Reading Needed", "sourceNeeds"),
        sec("Public Use", "publicUse"),
        sec("Public / Private Boundary", "publicPrivate"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: sharedReviewQuestions
    }),
    builder({
      key: "festival-entry",
      page: "festival-entry.html",
      label: "Festival Entry Navigator",
      title: "Film festival entry navigator",
      heading: "Choose festival entries by fit, evidence and cost, not panic scrolling.",
      lane: lanes.festival,
      prefix: "festival-entry",
      destination: "Save to drafts/festival-entries/.",
      note: "Compare FilmFreeway options, category fit, deadlines, fees, readiness and red flags.",
      art: "../assets/img/film-poster.webp",
      titleField: "festivalName",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "private working note"),
        text("filmTitle", "Film title"),
        select("projectStatus", "Project status", ["idea / planning", "rough cut", "fine cut", "finished film", "festival-ready package"], "rough cut"),
        text("runtime", "Runtime"),
        date("completionDate", "Completion date"),
        select("premiereStatus", "Premiere status", ["no public premiere yet", "local screening only", "online public release", "already premiered", "not sure"], "not sure"),
        text("festivalName", "Festival or FilmFreeway listing"),
        select("eventType", "Event type", ["physical film festival", "online festival / awards event", "documentary category", "short film category", "student / youth category", "regional / local festival", "genre / theme festival", "other"], "physical film festival"),
        select("targetOutcome", "Why submit?", ["audience and community", "industry networking", "awards / laurels", "distribution or sales", "learning feedback", "local cultural fit", "mixed"], "mixed"),
        area("categoryFit", "Category fit", "Runtime, genre, documentary type, student/youth, local, Indigenous/cultural, environmental, music, experimental or other category match."),
        area("eligibilityRules", "Eligibility, premiere and rule checks"),
        area("deadlineFee", "Deadline, fee and currency", "Earlybird, regular, late, Gold discount, waiver, total spend and refund notes."),
        area("materialsReady", "Submission materials ready", "Screener, trailer, poster, stills, synopsis, director bio, credits, subtitles, captions, DCP or press kit."),
        area("rightsClearance", "Rights and permissions check", "Music, archive, appearances, location releases, cultural review, insurance or distribution conflicts."),
        area("audienceFit", "Audience and festival fit"),
        area("travelPlan", "Travel, Q&A or screening support"),
        area("redFlags", "Red flags or questions before paying", "Venue missing, no past winners, unclear team, too many paid award categories, unrealistic promises, poor reviews, unclear refunds."),
        area("shortlistScore", "Shortlist score and reason", "Example: 8/10 because strong documentary category, clear venue, affordable early deadline and audience fit."),
        select("submitDecision", "Submit decision", ["do not submit yet", "watch list", "ask organiser first", "submit if budget allows", "submit now"], "watch list"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Film And Festival", ["filmTitle", "projectStatus", "runtime", "completionDate", "premiereStatus", "festivalName", "eventType", "targetOutcome", "submitDecision"]),
        sec("Category Fit", "categoryFit"),
        sec("Eligibility Premiere And Rule Checks", "eligibilityRules"),
        sec("Deadline Fee And Currency", "deadlineFee"),
        list("Submission Materials Ready", "materialsReady"),
        sec("Rights And Permissions Check", "rightsClearance"),
        sec("Audience And Festival Fit", "audienceFit"),
        sec("Travel Q And A Or Screening Support", "travelPlan"),
        list("Red Flags Or Questions Before Paying", "redFlags"),
        sec("Shortlist Score And Reason", "shortlistScore"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "Is there a real audience, screening, venue or clear online event format?",
        "Does the film match runtime, category, completion date, premiere and eligibility rules?",
        "What is the fee, deadline, currency and refund posture?",
        "Are screener, poster, stills, synopsis, captions/subtitles and rights clearances ready?",
        "What is the reason to submit beyond chasing a laurel?",
        "Which red flags or unanswered questions should be checked before paying?"
      ]
    }),
    builder({
      key: "research-angle",
      page: "research-angle.html",
      label: "Research Angle",
      title: "Documentary research angle builder",
      heading: "Choose the question before opening too many tabs.",
      lane: lanes.setup,
      prefix: "research-angle",
      destination: "Save to drafts/research-angles/.",
      note: "Research question, claim to test, known sources, missing sources and expertise needed.",
      art: "../assets/img/research-detective.webp",
      titleField: "researchQuestion",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("filmTitle", "Film title or topic"),
        area("researchQuestion", "Research question"),
        area("whyMatters", "Why it matters"),
        area("claimToTest", "Claim to test"),
        area("knownSources", "Known sources"),
        area("missingSources", "Missing sources or missing voices"),
        area("expertiseNeeded", "Expertise needed", "Filmmaker, subject, critic, local expert, archive, technical expert, audience."),
        area("uncertainty", "Uncertainty or risk of overclaiming"),
        area("publicUse", "Useful for public discussion, article, episode, screening or workshop"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Research Frame", ["filmTitle", "researchQuestion"]),
        sec("Why It Matters", "whyMatters"),
        sec("Claim To Test", "claimToTest"),
        list("Known Sources", "knownSources"),
        list("Missing Sources Or Voices", "missingSources"),
        list("Expertise Needed", "expertiseNeeded"),
        sec("Uncertainty Or Overclaim Risk", "uncertainty"),
        sec("Public Use", "publicUse"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "Which claim needs testing?",
        "What would count as evidence?",
        "Who made this, who is represented, and who is missing?",
        "Which source trail is worth following first?",
        "What should not be overclaimed?"
      ]
    }),
    builder({
      key: "source-trail",
      page: "source-trail.html",
      label: "Source Trail",
      title: "Source trail builder",
      heading: "Record what a source proves, and what it does not prove.",
      lane: lanes.setup,
      prefix: "source-trail",
      destination: "Save to drafts/source-trails/.",
      note: "Source details, access date, linked claim, support, limits and citation notes.",
      art: "../assets/img/research-detective.webp",
      titleField: "sourceTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("sourceTitle", "Source title"),
        select("sourceType", "Source type", ["film credit", "interview", "article", "archive", "book", "dataset", "website", "local knowledge", "other"], "website"),
        text("sourceUrl", "URL, citation or local reference"),
        date("accessDate", "Access / checked date"),
        area("filmClaimLinked", "Film claim or scene linked to this source"),
        area("evidenceSupports", "What the source supports"),
        area("evidenceLimits", "What the source does not prove"),
        area("reliability", "Reliability and provenance notes"),
        area("citationNotes", "Citation or quote notes"),
        area("publicPrivate", "Public/private boundary"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Source", ["sourceTitle", "sourceType", "sourceUrl", "accessDate"]),
        sec("Film Claim Or Scene Linked", "filmClaimLinked"),
        sec("What The Source Supports", "evidenceSupports"),
        sec("What The Source Does Not Prove", "evidenceLimits"),
        sec("Reliability And Provenance", "reliability"),
        sec("Citation Or Quote Notes", "citationNotes"),
        sec("Public / Private Boundary", "publicPrivate"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "What does this source actually support?",
        "What is still uncertain?",
        "When was it checked?",
        "Is it safe for public use?",
        "What source comes next?"
      ]
    }),
    builder({
      key: "interview-questions",
      page: "interview-questions.html",
      label: "Interview Questions",
      title: "Interview question builder",
      heading: "Prepare questions for the right person, not just the loudest take.",
      lane: lanes.setup,
      prefix: "interview-questions",
      destination: "Save to drafts/interviews/.",
      note: "Questions for filmmakers, subjects, critics, local experts and audiences.",
      art: "../assets/img/on-air-camera.webp",
      titleField: "interviewTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "private working note"),
        text("interviewTitle", "Interview prep title"),
        text("filmTitle", "Film title or topic"),
        select("target", "Interview target", ["filmmaker", "subject", "critic", "local expert", "audience", "mixed panel"], "mixed panel"),
        area("purpose", "Purpose of the interview"),
        area("filmmakerQuestions", "Questions for filmmaker"),
        area("subjectQuestions", "Questions for subject or participant"),
        area("criticQuestions", "Questions for critic or reviewer"),
        area("localExpertQuestions", "Questions for local expert"),
        area("audienceQuestions", "Questions for audience"),
        area("followups", "Follow-up prompts"),
        area("sensitiveBoundaries", "Sensitive boundaries or consent notes"),
        area("sourceReferences", "Source references to check before asking"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Interview Frame", ["interviewTitle", "filmTitle", "target"]),
        sec("Purpose", "purpose"),
        list("Questions For Filmmaker", "filmmakerQuestions"),
        list("Questions For Subject Or Participant", "subjectQuestions"),
        list("Questions For Critic Or Reviewer", "criticQuestions"),
        list("Questions For Local Expert", "localExpertQuestions"),
        list("Questions For Audience", "audienceQuestions"),
        list("Follow-Up Prompts", "followups"),
        sec("Sensitive Boundaries Or Consent Notes", "sensitiveBoundaries"),
        list("Source References To Check", "sourceReferences"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "Who is the right person to ask?",
        "Which questions are factual, reflective or sensitive?",
        "What source needs checking before the interview?",
        "What should stay private?",
        "What answer would change the public discussion?"
      ]
    }),
    builder({
      key: "runsheet",
      page: "runsheet.html",
      label: "Discussion Run Sheet",
      title: "Discussion run sheet builder",
      heading: "Give a screening conversation a spine without locking the room.",
      lane: lanes.public,
      prefix: "discussion-runsheet",
      destination: "Save to drafts/runsheets/.",
      note: "Host flow, evidence scenes, source pauses, audience questions and close.",
      art: "../assets/img/film-reel.webp",
      titleField: "sessionTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "public candidate"),
        text("sessionTitle", "Session title"),
        text("filmTitle", "Film title"),
        date("sessionDate", "Screening / discussion date"),
        text("host", "Host or facilitator"),
        text("audience", "Audience"),
        area("purpose", "Purpose of the discussion"),
        area("openingContext", "Opening context"),
        area("filmClaim", "Film claim to put on the table"),
        area("sceneEvidence", "Scenes to discuss as evidence"),
        area("sourceTrail", "Source trail pause"),
        area("discussionBlocks", "Discussion blocks or timing"),
        area("publicPrivatePause", "Public/private pause", "What should be named before people share?"),
        area("closeAndFollowup", "Close and follow-up"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Session", ["sessionTitle", "filmTitle", "sessionDate", "host", "audience"]),
        sec("Purpose", "purpose"),
        sec("Opening Context", "openingContext"),
        sec("Film Claim To Put On The Table", "filmClaim"),
        list("Scenes To Discuss As Evidence", "sceneEvidence"),
        list("Source Trail Pause", "sourceTrail"),
        list("Discussion Blocks Or Timing", "discussionBlocks"),
        sec("Public / Private Pause", "publicPrivatePause"),
        sec("Close And Follow-Up", "closeAndFollowup"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "What does the room need before the film starts?",
        "Which scenes carry the evidence?",
        "Where should the host pause for uncertainty?",
        "What can become public after the event?",
        "What follow-up action is genuinely useful?"
      ]
    }),
    builder({
      key: "event-notes",
      page: "event-notes.html",
      label: "Screening / Event",
      title: "Screening and public event builder",
      heading: "Turn a screening into useful notes without turning it into noise.",
      lane: lanes.public,
      prefix: "event-notes",
      destination: "Save to drafts/events/.",
      note: "Venue, permissions, audience, access, questions, responses and follow-up.",
      art: "../assets/img/film-poster.webp",
      titleField: "eventTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("eventTitle", "Event title"),
        text("filmTitle", "Film title"),
        date("eventDate", "Event date"),
        text("venue", "Venue or place"),
        text("host", "Host / organiser"),
        text("audience", "Audience or group"),
        area("screeningFormat", "Screening format"),
        area("permissions", "Permissions, access or cultural review notes"),
        area("runNotes", "What happened"),
        area("questionsAsked", "Questions asked"),
        area("responses", "Audience or panel responses"),
        area("accessNeeds", "Access, safety, weather or venue notes"),
        area("publicPrivate", "Public/private boundary"),
        area("followUp", "Follow-up actions")
      ],
      sections: [
        sec("Event", ["eventTitle", "filmTitle", "eventDate", "venue", "host", "audience"]),
        sec("Screening Format", "screeningFormat"),
        sec("Permissions Access Or Cultural Review Notes", "permissions"),
        sec("What Happened", "runNotes"),
        list("Questions Asked", "questionsAsked"),
        sec("Audience Or Panel Responses", "responses"),
        sec("Access Safety Weather Or Venue Notes", "accessNeeds"),
        sec("Public / Private Boundary", "publicPrivate"),
        list("Follow-Up Actions", "followUp")
      ],
      reviewQuestions: [
        "What happened in the room?",
        "Which questions were useful?",
        "What needs permission before public sharing?",
        "What should be followed up?",
        "What should the next screening learn?"
      ]
    }),
    builder({
      key: "follow-up-action",
      page: "follow-up-action.html",
      label: "Follow-Up Action",
      title: "Follow-up action builder",
      heading: "Shape the useful thing after the screening or research pass.",
      lane: lanes.public,
      prefix: "follow-up",
      destination: "Save to drafts/follow-ups/.",
      note: "Public page candidates, articles, episodes, workshops, research trails and private actions.",
      art: "../assets/img/on-air-camera.webp",
      titleField: "followupTitle",
      fields: [
        select("status", "Status", statusOptions(), "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "mixed - review before public use"),
        text("followupTitle", "Follow-up title"),
        text("filmTitle", "Film title or topic"),
        select("usefulFor", "Most useful for", ["public page", "article", "future episode", "screening", "workshop", "research trail", "mixed"], "mixed"),
        area("publicPageCandidate", "Public-facing page candidate"),
        area("summary", "Plain summary"),
        area("publicActions", "Public-safe actions"),
        area("privateActions", "Private or review-needed actions"),
        area("sourceLinks", "Source links and provenance"),
        text("owner", "Owner / next person"),
        text("deadline", "Timing or deadline"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Follow-Up", ["followupTitle", "filmTitle", "usefulFor", "owner", "deadline"]),
        sec("Public-Facing Page Candidate", "publicPageCandidate"),
        sec("Plain Summary", "summary"),
        list("Public-Safe Actions", "publicActions"),
        list("Private Or Review-Needed Actions", "privateActions"),
        list("Source Links And Provenance", "sourceLinks"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "What is useful after this viewing or event?",
        "Is this for a public page, article, episode, workshop or research trail?",
        "Which actions are public-safe?",
        "Which actions need private review?",
        "Who owns the next move?"
      ]
    }),
    builder({
      key: "handoff",
      page: "handoff.html",
      label: "Agent Handoff",
      title: "Agent handoff builder",
      heading: "Pass one small documentary job to a future agent.",
      lane: lanes.handoff,
      prefix: "agent-handoff",
      destination: "Save to drafts/handoffs/.",
      note: "Task packet, allowed sources, boundaries, output expectations and acceptance check.",
      art: "../assets/img/research-detective.webp",
      titleField: "handoffTitle",
      fields: [
        select("status", "Status", ["draft for human review", "ready for agent", "in progress", "done", "parked"], "draft for human review"),
        select("visibility", "Public/private posture", visibilityOptions(), "private working note"),
        text("handoffTitle", "Handoff title"),
        area("task", "Exact task"),
        area("sourceFiles", "Source files or pages to use"),
        area("allowedSources", "Allowed sources"),
        area("publicPrivate", "Public/private boundary"),
        area("questionsToAnswer", "Questions to answer"),
        area("outputNeeded", "Output needed"),
        area("doNotTouch", "Do not touch"),
        area("acceptanceCheck", "Acceptance check"),
        area("nextAction", "Next useful action")
      ],
      sections: [
        sec("Task", "task"),
        list("Source Files Or Pages To Use", "sourceFiles"),
        list("Allowed Sources", "allowedSources"),
        sec("Public / Private Boundary", "publicPrivate"),
        list("Questions To Answer", "questionsToAnswer"),
        sec("Output Needed", "outputNeeded"),
        list("Do Not Touch", "doNotTouch"),
        sec("Acceptance Check", "acceptanceCheck"),
        sec("Next Useful Action", "nextAction")
      ],
      reviewQuestions: [
        "Can the agent do this from the named sources?",
        "Is the output small and clear?",
        "What must stay private?",
        "What should the agent avoid changing?",
        "How will a human know the task is done?"
      ]
    })
  ];

  function builder(config) {
    return {
      ...config,
      render(data) {
        return renderMarkdown(config, data);
      }
    };
  }

  function text(id, label, hint = "", defaultValue = "") {
    return { id, label, type: "text", hint, defaultValue };
  }

  function date(id, label, hint = "", defaultValue = "") {
    return { id, label, type: "date", hint, defaultValue };
  }

  function area(id, label, hint = "", defaultValue = "") {
    return { id, label, type: "textarea", hint, defaultValue };
  }

  function select(id, label, options, defaultValue = "") {
    return { id, label, type: "select", options, defaultValue: defaultValue || options[0] };
  }

  function sec(title, value) {
    return { title, value, mode: "section" };
  }

  function list(title, value) {
    return { title, value, mode: "list" };
  }

  function statusOptions() {
    return ["draft for human review", "seed note", "ready for discussion", "reviewed", "parked"];
  }

  function visibilityOptions() {
    return ["mixed - review before public use", "public candidate", "private working note", "internal research"];
  }

  function renderMarkdown(config, data) {
    const titleValue = clean(data[config.titleField]);
    const parts = [
      `# ${config.label}${titleValue ? ` - ${titleValue}` : ""}`,
      renderMeta(config, data),
      renderReviewQuestions(config.reviewQuestions || sharedReviewQuestions)
    ];

    config.sections.forEach((section) => {
      const value = sectionValue(section.value, data);
      if (section.mode === "list") {
        parts.push(listSection(section.title, value));
      } else {
        parts.push(textSection(section.title, value));
      }
    });

    return parts.filter(Boolean).join("\n\n").trim() + "\n";
  }

  function renderMeta(config, data) {
    const lines = [
      line("Status", data.status || "draft for human review"),
      line("Draft label", "Draft for human review"),
      line("Visibility", data.visibility || "mixed - review before public use"),
      line("Builder", config.label),
      line("Lane", config.lane),
      line("Prepared date", dateStamp()),
      "Generated by Film Club Documentary Builders."
    ];
    return lines.filter(Boolean).join("\n");
  }

  function renderReviewQuestions(questions) {
    return [
      "## Compact Review Questions",
      "",
      questions.map((question) => `- ${question}`).join("\n")
    ].join("\n");
  }

  function sectionValue(value, data) {
    if (Array.isArray(value)) {
      return value.map((id) => line(labelFor(id), data[id])).filter(Boolean).join("\n");
    }
    return clean(data[value]);
  }

  function textSection(title, value) {
    if (!clean(value)) return "";
    return `## ${title}\n\n${clean(value)}`;
  }

  function listSection(title, value) {
    const items = clean(value)
      .split(/\r?\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (!items.length) return "";
    return `## ${title}\n\n${items.map((item) => `- ${item.replace(/^-+\s*/, "")}`).join("\n")}`;
  }

  function line(label, value) {
    if (!clean(value)) return "";
    return `${label}: ${clean(value)}`;
  }

  function clean(value) {
    return String(value || "").trim();
  }

  function dateStamp() {
    return new Date().toISOString().slice(0, 10);
  }

  function labelFor(id) {
    const labels = {
      filmTitle: "Film title",
      year: "Year",
      directorTeam: "Director / production team",
      format: "Format",
      watchedDate: "Date watched",
      whereWatched: "Where watched",
      viewingDate: "Viewing date",
      sessionContext: "Viewing context",
      sceneTitle: "Scene",
      timestamp: "Timestamp",
      subjectName: "Subject",
      themeName: "Theme / motif",
      sourceTitle: "Source title",
      sourceType: "Source type",
      sourceUrl: "Source reference",
      accessDate: "Access / checked date",
      interviewTitle: "Interview prep title",
      target: "Interview target",
      sessionTitle: "Session title",
      sessionDate: "Session date",
      host: "Host",
      audience: "Audience",
      eventTitle: "Event title",
      eventDate: "Event date",
      venue: "Venue",
      followupTitle: "Follow-up title",
      usefulFor: "Useful for",
      owner: "Owner",
      deadline: "Timing"
    };
    return labels[id] || id;
  }

  function slugify(value) {
    const slug = clean(value)
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug || "draft";
  }

  const flowOrder = [
    "film-profile",
    "research-angle",
    "source-trail",
    "interview-questions",
    "viewing-notes",
    "scene-analysis",
    "character-subject",
    "theme-motif",
    "festival-entry",
    "runsheet",
    "event-notes",
    "follow-up-action",
    "handoff"
  ];

  const builderLookup = Object.fromEntries(builders.map((item) => [item.key, item]));
  const orderedBuilders = flowOrder.map((key) => builderLookup[key]).filter(Boolean);

  const api = {
    lanes,
    builders: orderedBuilders,
    builderMap: Object.fromEntries(orderedBuilders.map((item) => [item.key, item])),
    dateStamp,
    slugify,
    clean
  };

  window.FilmClubDocumentaryBuilders = api;
})();
