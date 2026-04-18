document.addEventListener("DOMContentLoaded", function () {
    const body = document.body
    const sidebar = document.getElementById("sidebar")
    const sidebarToggle = document.getElementById("sidebarToggle")
    const sidebarLinks = document.querySelectorAll(".sidebar-link[data-view]")
    const panelLinks = document.querySelectorAll(".panel-link[data-view]")
    const views = document.querySelectorAll(".view")

    const dashboardView = document.getElementById("view-dashboard")
    const analyticsView = document.getElementById("view-analytics")
    const apiKeysView = document.getElementById("view-apikeys")
    const logsView = document.getElementById("view-logs")
    const rateLimitsView = document.getElementById("view-ratelimits")
    const billingView = document.getElementById("view-billing")
    const organizationsView = document.getElementById("view-organizations")

    const dashboardHeaderInfo = dashboardView.querySelector(".view-header > div:first-child")
    const dashboardSubtitle = dashboardView.querySelector(".view-subtitle")
    const dashboardActionBtn = dashboardView.querySelector(".btn-action")
    const dashboardStatCards = dashboardView.querySelectorAll(".stats-grid .stat-card")
    const dashboardRecentBody = dashboardView.querySelector(".dashboard-grid > .panel tbody")
    const dashboardRightPanels = dashboardView.querySelectorAll(".dashboard-right .panel")
    const dashboardWeekChart = dashboardRightPanels[0].querySelector(".bar-chart-bars")
    const dashboardActivityFeed = dashboardRightPanels[1].querySelector(".activity-feed")

    const analyticsPrimaryGrid = analyticsView.querySelector(".analytics-grid")
    const analyticsPanels = analyticsPrimaryGrid.querySelectorAll(".panel")
    const analyticsSubtitle = analyticsView.querySelector(".view-subtitle")
    const analyticsChart = analyticsPanels[0].querySelector(".bar-chart-bars")
    const analyticsTopEndpoints = analyticsPanels[1].querySelector(".ranked-list")
    const analyticsMetrics = analyticsPanels[2].querySelector(".metric-stack")

    const apiKeysSubtitle = apiKeysView.querySelector(".view-subtitle")
    const apiKeysBody = apiKeysView.querySelector("tbody")

    const logsBody = logsView.querySelector("tbody")

    const rateLimitBody = rateLimitsView.querySelector("tbody")
    const rateLimitStats = rateLimitsView.querySelector(".stats-grid")

    const billingSubtitle = billingView.querySelector(".view-subtitle")
    const billingStatCards = billingView.querySelectorAll(".stats-grid .stat-card")
    const billingInvoicesBody = billingView.querySelector("tbody")
    const billingRightPanels = billingView.querySelectorAll(".dashboard-right .panel")
    const billingPlanBreakdown = billingRightPanels[0].querySelector(".ranked-list")
    const billingWebhookFeed = billingRightPanels[1].querySelector(".activity-feed")

    const organizationsSubtitle = organizationsView.querySelector(".view-subtitle")
    const organizationsBody = organizationsView.querySelector("tbody")

    injectTierControls()
    injectTierPanels()

    const tierButtons = document.querySelectorAll(".tier-switcher-btn")
    const exploreAdvancedBtn = document.getElementById("exploreAdvancedBtn")
    const simulationBadge = document.getElementById("simulationBadge")
    const viewModeBadge = document.getElementById("viewModeBadge")
    const viewEnterpriseBadge = document.getElementById("viewEnterpriseBadge")
    const dashboardStartupCard = document.getElementById("dashboardStartupLock")
    const analyticsStartupCard = document.getElementById("analyticsStartupLock")
    const enterpriseEndpointBreakdown = document.getElementById("enterpriseEndpointBreakdown")
    const enterpriseOrgSegments = document.getElementById("enterpriseOrgSegments")
    const enterpriseSecuritySignals = document.getElementById("enterpriseSecuritySignals")
    const analyticsEnterpriseSegments = document.getElementById("analyticsEnterpriseSegments")
    const analyticsInfraSignals = document.getElementById("analyticsInfraSignals")
    const keyRotationFeed = document.getElementById("keyRotationFeed")
    const securityAlertsFeed = document.getElementById("securityAlertsFeed")
    const billingOverages = document.getElementById("billingOverages")
    const billingSubscriptionMix = document.getElementById("billingSubscriptionMix")
    const organizationsRoles = document.getElementById("organizationsRoles")
    const organizationsTeams = document.getElementById("organizationsTeams")
    const workspaceBadge = document.querySelector(".workspace-badge")
    const apiKeysSidebarCount = document.querySelector('[data-view="apikeys"] .sidebar-count')
    const organizationsSidebarCount = document.querySelector('[data-view="organizations"] .sidebar-count')
    const billingSidebarCount = document.querySelector('[data-view="billing"] .sidebar-count')

    const tiers = {
        startup: {
            workspaceBadge: "Startup",
            sidebarPlan: "Start",
            modeBadge: "Startup Workspace",
            dashboardSubtitle: "Thursday, April 2, 2026 • simple starter setup",
            dashboardAction: "+ New API Key",
            dashboardStats: [
                { value: "18,420", delta: "↑ 9% vs yesterday" },
                { value: "18", delta: "+2 this month" },
                { value: "1.3%", delta: "↓ 0.1% vs last week" },
                { value: "$2,900", delta: "+$320 this month" }
            ],
            dashboardRecent: [
                ["POST", "/v1/completions", "badge--green", "200", "44ms", "just now"],
                ["GET", "/v1/models", "badge--green", "200", "18ms", "21s ago"],
                ["POST", "/v1/embeddings", "badge--amber", "429", "14ms", "2 min ago"],
                ["GET", "/v1/usage", "badge--green", "200", "26ms", "4 min ago"],
                ["POST", "/v1/chat", "badge--green", "200", "39ms", "10 min ago"]
            ],
            dashboardChart: bars([
                ["Mon", 32], ["Tue", 48], ["Wed", 40], ["Thu", 56], ["Fri", 62], ["Sat", 28, "dim"], ["Today", 74, "active"]
            ]),
            dashboardActivity: [
                ["green", "Key <strong>op_live_a18c…</strong> — 420 requests in last hour", "just now"],
                ["amber", "Rate limit hit — starter workload on <strong>/v1/completions</strong>", "6 min ago"],
                ["blue", "New API key created by <strong>founder@example.com</strong>", "18 min ago"],
                ["purple", "Stripe invoice paid — <strong>$49.00</strong> from NovaSoft", "1 hr ago"]
            ],
            analyticsSubtitle: "Core API usage and performance metrics",
            analyticsChart: bars([
                ["Mar 3", 24], ["Mar 6", 31], ["Mar 9", 28], ["Mar 12", 42], ["Mar 15", 48],
                ["Mar 18", 40], ["Mar 21", 46], ["Mar 24", 52], ["Mar 27", 60], ["Mar 30", 66], ["Today", 71, "active"]
            ]),
            analyticsTop: [
                ["1", "POST /v1/completions", "11,420"],
                ["2", "POST /v1/embeddings", "3,802"],
                ["3", "GET /v1/models", "1,044"],
                ["4", "GET /v1/usage", "648"],
                ["5", "POST /v1/chat", "214"]
            ],
            analyticsMetrics: [
                ["Avg response time", "34ms", ""],
                ["p99 latency", "58ms", ""],
                ["Total requests (30d)", "184K", ""],
                ["Success rate", "98.7%", "metric-val--green"],
                ["Rate-limited requests", "1.1%", ""],
                ["4xx errors", "0.8%", "metric-val--red"]
            ],
            apiKeysSubtitle: "18 active keys across 1 organization",
            apiKeys: [
                keyRow("Production Key", "op_live_a18c…", "read, write", "11,420", "just now", "badge--green", "Active", "reject", "Revoke"),
                keyRow("Read-Only Reporting", "op_live_r55d…", "read", "1,044", "8 min ago", "badge--green", "Active", "reject", "Revoke"),
                keyRow("Staging", "op_test_q17n…", "read, write", "204", "Yesterday", "badge--blue", "Test", "reject", "Revoke")
            ],
            logs: [
                logRow("POST", "/v1/completions", "badge--green", "200", "44ms", "104.21.44.12", "op_live_a18c…", "just now"),
                logRow("GET", "/v1/models", "badge--green", "200", "18ms", "104.21.44.12", "op_live_a18c…", "21s ago"),
                logRow("POST", "/v1/embeddings", "badge--amber", "429", "14ms", "172.56.92.31", "op_live_r55d…", "2 min ago"),
                logRow("GET", "/v1/usage", "badge--green", "200", "26ms", "198.41.128.7", "op_live_r55d…", "4 min ago")
            ],
            rateLimits: [
                limitRow("Startup Plan", "100 req", "per minute", "68", 68, false, "badge--amber", "Watch"),
                limitRow("Founder Sandbox", "250 req", "per minute", "102", 41, false, "badge--green", "OK"),
                limitRow("NovaSoft", "300 req", "per minute", "64", 21, false, "badge--green", "OK")
            ],
            rateLimitStats: [
                statCard("Rate-Limited Requests (24h)", "42", "0.9% of total traffic", "amber", "stat-delta--up"),
                statCard("Orgs Near Limit", "1", "Starter workspace at 68%", "amber", "stat-delta--alert"),
                statCard("Redis Cache Hit Rate", "97.1%", "Starter plan average", "green", "stat-delta--up"),
                statCard("Enforcement Latency", "< 4ms", "p99 middleware overhead", "blue", "stat-delta--up")
            ],
            billingSubtitle: "Subscriptions, usage, and invoices via Stripe",
            billingStats: [
                { value: "$2,900", delta: "+$320 this month" },
                { value: "8", delta: "+1 this month" },
                { value: "8", delta: "$2,551 collected" },
                { value: "0", delta: "Healthy billing cycle" }
            ],
            billingInvoices: [
                invoiceRow("NovaSoft", "Starter", "$49.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("Northstar", "Growth", "$299.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("Tidal Labs", "Starter", "$49.00", "Mar 1, 2026", "badge--green", "Paid")
            ],
            billingPlans: [
                ["Growth", "$299/mo", "3 orgs"],
                ["Starter", "$49/mo", "5 orgs"]
            ],
            billingWebhooks: [
                ["green", "<strong>invoice.paid</strong> — Northstar", "38 min ago"],
                ["blue", "<strong>customer.subscription.updated</strong> — NovaSoft", "2 hrs ago"],
                ["green", "<strong>invoice.paid</strong> — Tidal Labs", "1 day ago"]
            ],
            billingOverages: [
                ["Metered line items", "Not enabled", ""],
                ["Projected overage", "$0", ""],
                ["Threshold alerts", "Growth+", ""],
                ["Manual invoice reviews", "0 pending", ""]
            ],
            billingMix: [
                ["Starter", "Flat subscriptions", "5 active"],
                ["Growth", "Single contract", "3 active"]
            ],
            organizationsSubtitle: "1 organization in this workspace",
            organizations: [
                organizationRow("NovaSoft", "Starter", "5", "18", "184,000", "badge--green", "Active")
            ],
            roles: [
                ["Admin", "1 full-access owner", "Enabled"],
                ["Developer", "2 teammates", "Growth+"],
                ["Analyst", "0 seats", "Growth+"]
            ],
            teams: [
                ["blue", "Single workspace team — <strong>Founding Team</strong>", "just now"],
                ["amber", "Role segmentation unlocks in <strong>Growth/Enterprise</strong>", "upgrade available"]
            ]
        },
        growth: {
            workspaceBadge: "Growth",
            sidebarPlan: "Growth",
            modeBadge: "Growth Workspace",
            dashboardSubtitle: "Thursday, April 2, 2026",
            dashboardAction: "+ New API Key",
            dashboardStats: [
                { value: "42,318", delta: "↑ 18% vs yesterday" },
                { value: "84", delta: "+6 this month" },
                { value: "0.8%", delta: "↓ 0.3% vs last week" },
                { value: "$14,200", delta: "+$1,400 this month" }
            ],
            dashboardRecent: [
                ["POST", "/v1/completions", "badge--green", "200", "38ms", "just now"],
                ["GET", "/v1/models", "badge--green", "200", "12ms", "4s ago"],
                ["POST", "/v1/embeddings", "badge--amber", "429", "8ms", "11s ago"],
                ["GET", "/v1/usage", "badge--green", "200", "22ms", "18s ago"],
                ["DELETE", "/v1/keys/op_k_8f2a", "badge--red", "401", "6ms", "42s ago"]
            ],
            dashboardChart: bars([
                ["Mon", 52], ["Tue", 68], ["Wed", 45], ["Thu", 81], ["Fri", 74], ["Sat", 38, "dim"], ["Today", 91, "active"]
            ]),
            dashboardActivity: [
                ["green", "Key <strong>op_live_7f2a…</strong> — 1,240 requests in last hour", "just now"],
                ["amber", "Rate limit hit — org <strong>Acme Corp</strong> on /v1/completions", "2 min ago"],
                ["blue", "New API key created by <strong>sarah@example.com</strong>", "14 min ago"],
                ["purple", "Stripe invoice paid — <strong>$299.00</strong> from DataFlow Inc", "38 min ago"],
                ["red", "Key <strong>op_live_3d9c…</strong> revoked — suspicious activity", "1 hr ago"],
                ["green", "Org <strong>BuildRight LLC</strong> upgraded to Growth plan", "2 hrs ago"]
            ],
            analyticsSubtitle: "API usage and performance metrics",
            analyticsChart: bars([
                ["Mar 3", 41], ["Mar 6", 55], ["Mar 9", 48], ["Mar 12", 63], ["Mar 15", 72],
                ["Mar 18", 58], ["Mar 21", 67], ["Mar 24", 79], ["Mar 27", 85], ["Mar 30", 91], ["Today", 96, "active"]
            ]),
            analyticsTop: [
                ["1", "POST /v1/completions", "28,411"],
                ["2", "POST /v1/embeddings", "9,832"],
                ["3", "GET /v1/models", "2,104"],
                ["4", "GET /v1/usage", "1,488"],
                ["5", "POST /v1/chat", "483"]
            ],
            analyticsMetrics: [
                ["Avg response time", "28ms", ""],
                ["p99 latency", "38ms", ""],
                ["Total requests (30d)", "1.24M", ""],
                ["Success rate", "99.2%", "metric-val--green"],
                ["Rate-limited requests", "0.4%", ""],
                ["4xx errors", "0.4%", "metric-val--red"]
            ],
            apiKeysSubtitle: "84 active keys across 3 organizations",
            apiKeys: [
                keyRow("Production Key", "op_live_7f2a…", "read, write", "28,411", "just now", "badge--green", "Active", "reject", "Revoke"),
                keyRow("Read-Only Analytics", "op_live_c4e1…", "read", "1,488", "4 min ago", "badge--green", "Active", "reject", "Revoke"),
                keyRow("DataFlow Inc — Prod", "op_live_9b3d…", "read, write, billing", "9,832", "1 hr ago", "badge--green", "Active", "reject", "Revoke"),
                keyRow("Acme Corp — Staging", "op_test_1a8f…", "read, write", "483", "Yesterday", "badge--blue", "Test", "reject", "Revoke"),
                keyRow("BuildRight — Legacy", "op_live_3d9c…", "read", "0", "2 weeks ago", "badge--red", "Revoked", "approve", "Restore")
            ],
            logs: [
                logRow("POST", "/v1/completions", "badge--green", "200", "38ms", "104.21.44.12", "op_live_7f2a…", "just now"),
                logRow("GET", "/v1/models", "badge--green", "200", "12ms", "104.21.44.12", "op_live_7f2a…", "4s ago"),
                logRow("POST", "/v1/embeddings", "badge--amber", "429", "8ms", "172.56.92.31", "op_live_9b3d…", "11s ago"),
                logRow("GET", "/v1/usage", "badge--green", "200", "22ms", "198.41.128.7", "op_live_c4e1…", "18s ago"),
                logRow("DELETE", "/v1/keys/op_k_8f2a", "badge--red", "401", "6ms", "45.33.18.44", "—", "42s ago"),
                logRow("POST", "/v1/chat", "badge--green", "200", "41ms", "104.21.44.12", "op_live_7f2a…", "1 min ago"),
                logRow("GET", "/v1/keys", "badge--green", "200", "19ms", "198.41.128.7", "op_live_c4e1…", "2 min ago"),
                logRow("POST", "/v1/completions", "badge--red", "500", "2,104ms", "172.56.92.31", "op_live_9b3d…", "4 min ago")
            ],
            rateLimits: [
                limitRow("Starter Plan", "100 req", "per minute", "42", 42, false, "badge--green", "OK"),
                limitRow("Growth Plan", "1,000 req", "per minute", "380", 38, false, "badge--green", "OK"),
                limitRow("Acme Corp (custom)", "500 req", "per minute", "487", 97, true, "badge--amber", "Near Limit"),
                limitRow("Pro Plan", "10,000 req", "per minute", "1,240", 12, false, "badge--green", "OK"),
                limitRow("BuildRight LLC (custom)", "2,000 req", "per minute", "0", 0, false, "badge--blue", "Idle")
            ],
            rateLimitStats: [
                statCard("Rate-Limited Requests (24h)", "183", "0.4% of total traffic", "amber", "stat-delta--up"),
                statCard("Orgs Near Limit", "1", "Acme Corp at 97%", "amber", "stat-delta--alert"),
                statCard("Redis Cache Hit Rate", "98.4%", "Avg across all keys", "green", "stat-delta--up"),
                statCard("Enforcement Latency", "< 2ms", "p99 middleware overhead", "blue", "stat-delta--up")
            ],
            billingSubtitle: "Subscriptions, usage, and invoices via Stripe",
            billingStats: [
                { value: "$14,200", delta: "+$1,400 this month" },
                { value: "47", delta: "+3 this month" },
                { value: "44", delta: "$11,800 collected" },
                { value: "1", delta: "Retry pending" }
            ],
            billingInvoices: [
                invoiceRow("DataFlow Inc", "Growth", "$299.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("Acme Corp", "Pro", "$599.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("BuildRight LLC", "Growth", "$299.00", "Apr 1, 2026", "badge--red", "Failed"),
                invoiceRow("NovaSoft", "Starter", "$49.00", "Mar 1, 2026", "badge--green", "Paid"),
                invoiceRow("Horizon Labs", "Pro", "$599.00", "Mar 1, 2026", "badge--green", "Paid")
            ],
            billingPlans: [
                ["Pro", "$599/mo", "12 orgs"],
                ["Growth", "$299/mo", "24 orgs"],
                ["Starter", "$49/mo", "11 orgs"]
            ],
            billingWebhooks: [
                ["green", "<strong>invoice.paid</strong> — DataFlow Inc", "38 min ago"],
                ["red", "<strong>invoice.payment_failed</strong> — BuildRight LLC", "1 hr ago"],
                ["blue", "<strong>customer.subscription.updated</strong> — Acme Corp → Pro", "2 hrs ago"],
                ["green", "<strong>invoice.paid</strong> — Acme Corp", "2 hrs ago"]
            ],
            billingOverages: [
                ["Metered line items", "Growth add-on", ""],
                ["Projected overage", "$420", ""],
                ["Threshold alerts", "3 configured", ""],
                ["Manual invoice reviews", "1 pending", ""]
            ],
            billingMix: [
                ["Pro", "Annual + monthly mix", "12 orgs"],
                ["Growth", "Flat subscriptions", "24 orgs"],
                ["Starter", "Self-serve plans", "11 orgs"]
            ],
            organizationsSubtitle: "3 organizations in this workspace",
            organizations: [
                organizationRow("DataFlow Inc", "Growth", "8", "14", "342,100", "badge--green", "Active"),
                organizationRow("Acme Corp", "Pro", "22", "38", "891,400", "badge--green", "Active"),
                organizationRow("BuildRight LLC", "Growth", "5", "32", "6,800", "badge--amber", "Payment Due")
            ],
            roles: [
                ["Admin", "6 platform admins", "Enabled"],
                ["Developer", "19 builders", "Enabled"],
                ["Analyst", "10 reporting seats", "Growth+"]
            ],
            teams: [
                ["green", "Team <strong>Core Platform</strong> shipped new workflow triggers", "22 min ago"],
                ["blue", "<strong>Analytics</strong> created read-only keys for reporting", "1 hr ago"],
                ["amber", "Role segmentation deepens further in <strong>Enterprise</strong>", "upgrade preview"]
            ],
            enterprise: {
                endpointBreakdown: [
                    ["1", "POST /v1/completions", "1.18M"],
                    ["2", "POST /v1/embeddings", "720K"],
                    ["3", "POST /v1/chat", "390K"],
                    ["4", "GET /v1/usage", "96K"]
                ],
                orgSegments: [
                    ["Acme Corp", "41% of traffic", "998K req"],
                    ["DataFlow Inc", "23% of traffic", "552K req"],
                    ["Horizon Labs", "18% of traffic", "428K req"],
                    ["Long-tail orgs", "18% of traffic", "422K req"]
                ],
                securitySignals: [
                    ["amber", "Suspicious key pattern detected on <strong>Acme Corp</strong>", "6 min ago"],
                    ["blue", "Allowlist event applied to <strong>eu-west-1</strong> gateway", "18 min ago"],
                    ["green", "Key rotation completed for <strong>27 production keys</strong>", "43 min ago"]
                ],
                analyticsSegments: [
                    ["North America", "58% of usage", "720K req"],
                    ["Europe", "28% of usage", "348K req"],
                    ["APAC", "14% of usage", "174K req"]
                ],
                infraSignals: [
                    ["Latency distribution p95", "62ms", ""],
                    ["Regional traffic skew", "eu-west-1 +18%", ""],
                    ["Rate limiting spikes", "3 orgs above 85%", ""],
                    ["Suspicious IP clusters", "2 active investigations", "metric-val--red"]
                ],
                keyRotation: [
                    ["blue", "Rotation policy updated for <strong>DataFlow production keys</strong>", "12 min ago"],
                    ["green", "Allowlist synced across <strong>3 regions</strong>", "31 min ago"],
                    ["amber", "Key <strong>op_live_r44e…</strong> scheduled for forced rotation", "58 min ago"]
                ],
                securityAlerts: [
                    ["red", "Impossible travel detected for <strong>admin@datagrid.com</strong>", "5 min ago"],
                    ["amber", "Burst traffic from unlisted IP range blocked in <strong>us-east-1</strong>", "14 min ago"],
                    ["blue", "New IP allowlist event approved by <strong>Platform Admin</strong>", "41 min ago"]
                ],
                billingOverages: [
                    ["Usage-based overage forecast", "$8,420", ""],
                    ["Active subscriptions", "126 mixed contracts", ""],
                    ["Enterprise renewal risk", "2 contracts need review", "metric-val--red"],
                    ["Custom billing thresholds", "11 orgs configured", ""]
                ],
                billingMix: [
                    ["Enterprise", "Annual + usage-based", "38 orgs"],
                    ["Pro", "Regional contracts", "44 orgs"],
                    ["Growth", "Team plans", "32 orgs"],
                    ["Starter", "Sandbox tenants", "12 orgs"]
                ],
                roles: [
                    ["Admin", "42 platform admins", "Enabled"],
                    ["Developer", "188 engineering seats", "Enabled"],
                    ["Analyst", "94 reporting seats", "Enabled"]
                ],
                teams: [
                    ["green", "<strong>Security</strong> reviewed suspicious activity alerts", "8 min ago"],
                    ["blue", "<strong>Platform Ops</strong> rolled out new IP allowlist", "16 min ago"],
                    ["purple", "<strong>Billing Ops</strong> reconciled enterprise overages", "42 min ago"]
                ]
            }
        },
        enterprise: {
            workspaceBadge: "Enterprise",
            sidebarPlan: "Ent",
            modeBadge: "Enterprise Workspace",
            dashboardSubtitle: "Thursday, April 2, 2026 • enterprise simulation at global scale",
            dashboardAction: "+ New API Key",
            dashboardStats: [
                { value: "2.4M+", delta: "↑ 26% vs yesterday" },
                { value: "512", delta: "+38 this month" },
                { value: "0.21%", delta: "↓ 0.09% vs last week" },
                { value: "$214,800", delta: "+$24,600 this month" }
            ],
            dashboardRecent: [
                ["POST", "/v1/completions", "badge--green", "200", "24ms", "just now"],
                ["POST", "/v1/chat", "badge--green", "200", "31ms", "2s ago"],
                ["GET", "/v1/usage", "badge--green", "200", "18ms", "5s ago"],
                ["POST", "/v1/embeddings", "badge--amber", "429", "7ms", "8s ago"],
                ["DELETE", "/v1/keys/op_ent_91ad", "badge--red", "401", "5ms", "14s ago"]
            ],
            dashboardChart: bars([
                ["Mon", 72], ["Tue", 84], ["Wed", 77], ["Thu", 92], ["Fri", 88], ["Sat", 66, "dim"], ["Today", 98, "active"]
            ]),
            dashboardActivity: [
                ["green", "Key <strong>op_ent_7f2a…</strong> — 84,120 requests in last hour", "just now"],
                ["amber", "Rate limiting spike — <strong>3 enterprise orgs</strong> above 90%", "1 min ago"],
                ["blue", "IP allowlist updated for <strong>eu-west-1</strong> ingress", "7 min ago"],
                ["purple", "Usage-based invoice generated — <strong>$18,240</strong> for Acme Corp", "15 min ago"],
                ["red", "Suspicious activity alert escalated for <strong>admin@horizonlabs.com</strong>", "21 min ago"],
                ["green", "Org <strong>Northstar Systems</strong> provisioned 22 new admin keys", "32 min ago"]
            ],
            analyticsSubtitle: "Advanced analytics, infra signals, and org segmentation",
            analyticsChart: bars([
                ["Mar 3", 58], ["Mar 6", 66], ["Mar 9", 62], ["Mar 12", 71], ["Mar 15", 78],
                ["Mar 18", 76], ["Mar 21", 82], ["Mar 24", 88], ["Mar 27", 92], ["Mar 30", 95], ["Today", 100, "active"]
            ]),
            analyticsTop: [
                ["1", "POST /v1/completions", "1.18M"],
                ["2", "POST /v1/embeddings", "720K"],
                ["3", "POST /v1/chat", "390K"],
                ["4", "GET /v1/usage", "142K"],
                ["5", "GET /v1/models", "84K"]
            ],
            analyticsMetrics: [
                ["Avg response time", "19ms", ""],
                ["p99 latency", "29ms", ""],
                ["Total requests (30d)", "54.8M", ""],
                ["Success rate", "99.74%", "metric-val--green"],
                ["Rate-limited requests", "0.12%", ""],
                ["4xx errors", "0.09%", "metric-val--red"]
            ],
            apiKeysSubtitle: "512 active keys across 18 organizations",
            apiKeys: [
                keyRow("Acme Corp — Global Prod", "op_ent_7f2a…", "read, write, admin", "9.8M", "just now", "badge--green", "Active", "reject", "Revoke"),
                keyRow("Horizon Labs — EU Gateway", "op_ent_c4e1…", "read, write", "4.1M", "11s ago", "badge--green", "Active", "reject", "Revoke"),
                keyRow("Northstar — Billing Sync", "op_ent_9b3d…", "billing, read", "1.2M", "2 min ago", "badge--green", "Active", "reject", "Revoke"),
                keyRow("DataGrid — Analyst Export", "op_ent_1a8f…", "read", "880K", "18 min ago", "badge--blue", "Restricted", "reject", "Revoke"),
                keyRow("Legacy Partner", "op_ent_3d9c…", "read", "0", "3 weeks ago", "badge--red", "Revoked", "approve", "Restore")
            ],
            logs: [
                logRow("POST", "/v1/completions", "badge--green", "200", "24ms", "104.21.44.12", "op_ent_7f2a…", "just now"),
                logRow("POST", "/v1/chat", "badge--green", "200", "31ms", "172.56.92.31", "op_ent_7f2a…", "2s ago"),
                logRow("GET", "/v1/usage", "badge--green", "200", "18ms", "198.41.128.7", "op_ent_c4e1…", "5s ago"),
                logRow("POST", "/v1/embeddings", "badge--amber", "429", "7ms", "45.33.18.44", "op_ent_9b3d…", "8s ago"),
                logRow("DELETE", "/v1/keys/op_ent_91ad", "badge--red", "401", "5ms", "91.212.43.9", "—", "14s ago"),
                logRow("POST", "/v1/events", "badge--green", "200", "16ms", "104.21.44.12", "op_ent_4db2…", "22s ago"),
                logRow("GET", "/v1/keys", "badge--green", "200", "11ms", "198.41.128.7", "op_ent_c4e1…", "31s ago"),
                logRow("POST", "/v1/completions", "badge--red", "500", "804ms", "172.56.92.31", "op_ent_9b3d…", "2 min ago")
            ],
            rateLimits: [
                limitRow("Enterprise Core", "120,000 req", "per minute", "91,400", 76, false, "badge--green", "OK"),
                limitRow("Acme Corp (custom)", "40,000 req", "per minute", "38,800", 97, true, "badge--amber", "Near Limit"),
                limitRow("Horizon Labs (custom)", "25,000 req", "per minute", "18,420", 74, false, "badge--green", "OK"),
                limitRow("Northstar Systems", "18,000 req", "per minute", "16,110", 89, true, "badge--amber", "Watch"),
                limitRow("Sandbox Fleet", "4,000 req", "per minute", "980", 24, false, "badge--blue", "Idle")
            ],
            rateLimitStats: [
                statCard("Rate-Limited Requests (24h)", "4,182", "0.12% of total traffic", "amber", "stat-delta--up"),
                statCard("Orgs Near Limit", "3", "Acme, Northstar, Horizon", "amber", "stat-delta--alert"),
                statCard("Redis Cache Hit Rate", "99.3%", "Global edge average", "green", "stat-delta--up"),
                statCard("Enforcement Latency", "< 1.4ms", "p99 middleware overhead", "blue", "stat-delta--up")
            ],
            billingSubtitle: "Subscriptions, usage-based overages, and contract billing",
            billingStats: [
                { value: "$214,800", delta: "+$24,600 this month" },
                { value: "126", delta: "+9 enterprise renewals" },
                { value: "118", delta: "$201,440 collected" },
                { value: "4", delta: "3 need finance review" }
            ],
            billingInvoices: [
                invoiceRow("Acme Corp", "Enterprise", "$18,240.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("Horizon Labs", "Enterprise", "$14,880.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("Northstar Systems", "Pro + Overage", "$9,420.00", "Apr 1, 2026", "badge--amber", "Review"),
                invoiceRow("DataGrid", "Enterprise", "$12,600.00", "Apr 1, 2026", "badge--green", "Paid"),
                invoiceRow("BuildRight LLC", "Growth + Overage", "$1,980.00", "Apr 1, 2026", "badge--red", "Failed")
            ],
            billingPlans: [
                ["Enterprise", "Annual + usage", "38 orgs"],
                ["Pro", "$599/mo + addons", "44 orgs"],
                ["Growth", "$299/mo", "32 orgs"],
                ["Starter", "$49/mo", "12 orgs"]
            ],
            billingWebhooks: [
                ["green", "<strong>invoice.paid</strong> — Acme Corp", "6 min ago"],
                ["amber", "<strong>invoice.upcoming</strong> — Northstar Systems", "18 min ago"],
                ["blue", "<strong>customer.subscription.updated</strong> — Horizon Labs", "31 min ago"],
                ["red", "<strong>invoice.payment_failed</strong> — BuildRight LLC", "52 min ago"]
            ],
            billingOverages: [
                ["Usage-based overage forecast", "$8,420", ""],
                ["Contract renewals in review", "4 accounts", ""],
                ["Threshold alerts triggered", "11 orgs", ""],
                ["Unbilled metered usage", "$21,300", "metric-val--red"]
            ],
            billingMix: [
                ["Enterprise", "Annual + usage-based", "38 orgs"],
                ["Regional", "Custom rate cards", "17 orgs"],
                ["Pro", "Standard subscriptions", "44 orgs"],
                ["Growth", "Team plans", "32 orgs"]
            ],
            organizationsSubtitle: "18 organizations, 324 members, 42 teams",
            organizations: [
                organizationRow("Acme Corp", "Enterprise", "84", "142", "18.4M", "badge--green", "Active"),
                organizationRow("Horizon Labs", "Enterprise", "56", "101", "12.8M", "badge--green", "Active"),
                organizationRow("Northstar Systems", "Pro", "41", "73", "8.2M", "badge--green", "Active"),
                organizationRow("DataGrid", "Enterprise", "29", "64", "6.4M", "badge--green", "Active"),
                organizationRow("BuildRight LLC", "Growth", "12", "26", "980K", "badge--amber", "Payment Due")
            ],
            roles: [
                ["Admin", "42 platform admins", "Enabled"],
                ["Developer", "188 engineering seats", "Enabled"],
                ["Analyst", "94 reporting seats", "Enabled"]
            ],
            teams: [
                ["green", "<strong>Security Operations</strong> acknowledged suspicious activity cluster", "8 min ago"],
                ["blue", "<strong>Platform Ops</strong> pushed IP allowlist changes to 3 regions", "16 min ago"],
                ["purple", "<strong>Billing Ops</strong> reconciled metered overages for Acme Corp", "42 min ago"]
            ],
            enterprise: {
                endpointBreakdown: [
                    ["1", "POST /v1/completions", "1.18M"],
                    ["2", "POST /v1/embeddings", "720K"],
                    ["3", "POST /v1/chat", "390K"],
                    ["4", "GET /v1/usage", "142K"]
                ],
                orgSegments: [
                    ["Acme Corp", "41% of traffic", "998K req/hr"],
                    ["Horizon Labs", "23% of traffic", "552K req/hr"],
                    ["Northstar Systems", "18% of traffic", "428K req/hr"],
                    ["Remaining orgs", "18% of traffic", "422K req/hr"]
                ],
                securitySignals: [
                    ["amber", "Suspicious key pattern detected on <strong>Acme Corp</strong>", "6 min ago"],
                    ["red", "Impossible travel alert on <strong>admin@horizonlabs.com</strong>", "9 min ago"],
                    ["blue", "IP allowlisting event applied to <strong>eu-west-1</strong>", "18 min ago"],
                    ["green", "Key rotation completed for <strong>27 production keys</strong>", "43 min ago"]
                ],
                analyticsSegments: [
                    ["North America", "58% of usage", "31.8M req"],
                    ["Europe", "28% of usage", "15.3M req"],
                    ["APAC", "14% of usage", "7.7M req"]
                ],
                infraSignals: [
                    ["Latency distribution p95", "62ms", ""],
                    ["Regional traffic skew", "eu-west-1 +18%", ""],
                    ["Rate limiting spikes", "3 orgs above 85%", ""],
                    ["Suspicious IP clusters", "2 active investigations", "metric-val--red"]
                ],
                keyRotation: [
                    ["blue", "Rotation policy updated for <strong>Horizon Labs production keys</strong>", "12 min ago"],
                    ["green", "Allowlist synced across <strong>3 regions</strong>", "31 min ago"],
                    ["amber", "Key <strong>op_ent_r44e…</strong> scheduled for forced rotation", "58 min ago"]
                ],
                securityAlerts: [
                    ["red", "Impossible travel detected for <strong>admin@datagrid.com</strong>", "5 min ago"],
                    ["amber", "Burst traffic from unlisted IP range blocked in <strong>us-east-1</strong>", "14 min ago"],
                    ["blue", "New IP allowlist approved by <strong>Platform Admin</strong>", "41 min ago"]
                ],
                billingOverages: [
                    ["Usage-based overage forecast", "$8,420", ""],
                    ["Active subscriptions", "126 mixed contracts", ""],
                    ["Renewals requiring review", "4 contracts", "metric-val--red"],
                    ["Custom billing thresholds", "11 orgs configured", ""]
                ],
                billingMix: [
                    ["Enterprise", "Annual + usage-based", "38 orgs"],
                    ["Regional", "Custom rate cards", "17 orgs"],
                    ["Pro", "Regional contracts", "44 orgs"],
                    ["Growth", "Team plans", "32 orgs"]
                ],
                roles: [
                    ["Admin", "42 platform admins", "Enabled"],
                    ["Developer", "188 engineering seats", "Enabled"],
                    ["Analyst", "94 reporting seats", "Enabled"]
                ],
                teams: [
                    ["green", "<strong>Security</strong> reviewed suspicious activity alerts", "8 min ago"],
                    ["blue", "<strong>Platform Ops</strong> rolled out new IP allowlist", "16 min ago"],
                    ["purple", "<strong>Billing Ops</strong> reconciled enterprise overages", "42 min ago"]
                ]
            }
        }
    }

    let currentTier = "growth"

    function injectTierControls() {
        const topbarSearch = document.querySelector(".topbar-search")
        const topbarActions = document.querySelector(".topbar-actions")
        const controls = document.createElement("div")
        controls.className = "topbar-demo-controls"
        controls.innerHTML = [
            '<div class="tier-switcher" role="tablist" aria-label="Demo view">',
            '<button class="tier-switcher-btn" type="button" data-tier="startup">Startup</button>',
            '<button class="tier-switcher-btn active" type="button" data-tier="growth" aria-selected="true">Growth</button>',
            '<button class="tier-switcher-btn" type="button" data-tier="enterprise">Enterprise</button>',
            "</div>",
            '<button class="topbar-link-btn" id="exploreAdvancedBtn" type="button">Explore Advanced Features</button>',
            '<span class="simulation-badge" id="simulationBadge" hidden>Enterprise Simulation</span>'
        ].join("")
        topbarSearch.parentNode.insertBefore(controls, topbarActions)

        const badges = document.createElement("div")
        badges.className = "view-header-badges"
        badges.innerHTML = [
            '<span class="view-badge" id="viewModeBadge">Growth Workspace</span>',
            '<span class="view-badge view-badge--enterprise" id="viewEnterpriseBadge" hidden>Enterprise Simulation</span>'
        ].join("")
        dashboardHeaderInfo.prepend(badges)
    }

    function injectTierPanels() {
        const dashboardStatsGrid = dashboardView.querySelector(".stats-grid")
        const dashboardLock = document.createElement("div")
        dashboardLock.className = "tier-lock-card startup-only"
        dashboardLock.id = "dashboardStartupLock"
        dashboardLock.innerHTML = [
            "<div>",
            '<span class="tier-lock-eyebrow">Upgrade Preview</span>',
            "<h2>Advanced analytics and security controls</h2>",
            "<p>Available in Growth/Enterprise plans: endpoint breakdowns, org segmentation, suspicious activity alerts, and infrastructure signals.</p>",
            "</div>",
            '<button class="btn-action btn-action--outline tier-lock-btn" type="button" data-tier-jump="growth">Unlock Growth Features</button>'
        ].join("")
        dashboardStatsGrid.insertAdjacentElement("afterend", dashboardLock)

        const dashboardEnterprise = document.createElement("div")
        dashboardEnterprise.className = "enterprise-grid enterprise-only"
        dashboardEnterprise.innerHTML = [
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Endpoint Breakdown</h2><span class="badge badge--blue">Enterprise</span></div><ul class="ranked-list" id="enterpriseEndpointBreakdown"></ul></div>',
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Org-Level Usage Segmentation</h2><span class="badge badge--green">Multi-org</span></div><ul class="ranked-list" id="enterpriseOrgSegments"></ul></div>',
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Security Signals</h2><span class="badge badge--amber">Live</span></div><ul class="activity-feed" id="enterpriseSecuritySignals"></ul></div>'
        ].join("")
        dashboardLock.insertAdjacentElement("afterend", dashboardEnterprise)

        const analyticsLock = document.createElement("div")
        analyticsLock.className = "tier-lock-card startup-only"
        analyticsLock.id = "analyticsStartupLock"
        analyticsLock.innerHTML = [
            "<div>",
            '<span class="tier-lock-eyebrow">Advanced Analytics</span>',
            "<h2>Segmentation and infrastructure insights</h2>",
            "<p>Available in Growth/Enterprise plans: org-level usage segmentation, regional traffic, and latency distribution.</p>",
            "</div>",
            '<button class="btn-action btn-action--outline tier-lock-btn" type="button" data-tier-jump="growth">Switch to Growth View</button>'
        ].join("")
        analyticsPrimaryGrid.insertAdjacentElement("afterend", analyticsLock)

        const analyticsEnterprise = document.createElement("div")
        analyticsEnterprise.className = "analytics-grid enterprise-only"
        analyticsEnterprise.innerHTML = [
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Org Usage Segmentation</h2></div><ul class="ranked-list" id="analyticsEnterpriseSegments"></ul></div>',
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Infrastructure Signals</h2></div><div class="metric-stack" id="analyticsInfraSignals"></div></div>'
        ].join("")
        analyticsLock.insertAdjacentElement("afterend", analyticsEnterprise)

        const apiKeysEnterprise = document.createElement("div")
        apiKeysEnterprise.className = "analytics-grid enterprise-only"
        apiKeysEnterprise.style.marginTop = "24px"
        apiKeysEnterprise.innerHTML = [
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Key Rotation & Allowlisting</h2><span class="badge badge--blue">Enterprise</span></div><ul class="activity-feed" id="keyRotationFeed"></ul></div>',
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Suspicious Activity Alerts</h2><span class="badge badge--amber">Security</span></div><ul class="activity-feed" id="securityAlertsFeed"></ul></div>'
        ].join("")
        apiKeysView.querySelector(".panel").insertAdjacentElement("afterend", apiKeysEnterprise)

        const billingEnterprise = document.createElement("div")
        billingEnterprise.className = "analytics-grid enterprise-only"
        billingEnterprise.style.marginTop = "24px"
        billingEnterprise.innerHTML = [
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Usage-Based Overage Signals</h2><span class="badge badge--amber">Billing Ops</span></div><div class="metric-stack" id="billingOverages"></div></div>',
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Subscription Complexity</h2><span class="badge badge--blue">Enterprise</span></div><ul class="ranked-list" id="billingSubscriptionMix"></ul></div>'
        ].join("")
        billingView.querySelector(".dashboard-grid").insertAdjacentElement("afterend", billingEnterprise)

        const organizationsEnterprise = document.createElement("div")
        organizationsEnterprise.className = "analytics-grid enterprise-only"
        organizationsEnterprise.style.marginTop = "24px"
        organizationsEnterprise.innerHTML = [
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Role-Based Access</h2><span class="badge badge--blue">Admin / Dev / Analyst</span></div><ul class="ranked-list" id="organizationsRoles"></ul></div>',
            '<div class="panel"><div class="panel-header"><h2 class="panel-title">Team Segments</h2><span class="badge badge--green">Multi-team</span></div><ul class="activity-feed" id="organizationsTeams"></ul></div>'
        ].join("")
        organizationsView.querySelector(".panel").insertAdjacentElement("afterend", organizationsEnterprise)
    }

    function showView(viewId) {
        views.forEach(function (view) {
            view.classList.toggle("view--hidden", view.id !== "view-" + viewId)
        })

        sidebarLinks.forEach(function (link) {
            link.classList.toggle("active", link.dataset.view === viewId)
        })

        const content = document.querySelector(".app-content")
        if (content) {
            content.scrollTop = 0
        }
    }

    function switchTier(tier, announce) {
        currentTier = tier
        body.setAttribute("data-tier", tier)

        const data = tiers[tier]
        const enterpriseData = tier === "enterprise" ? data.enterprise : tiers.growth.enterprise

        tierButtons.forEach(function (button) {
            const active = button.dataset.tier === tier
            button.classList.toggle("active", active)
            button.setAttribute("aria-selected", String(active))
        })

        workspaceBadge.textContent = data.workspaceBadge
        apiKeysSidebarCount.textContent = numericValue(data.apiKeysSubtitle)
        organizationsSidebarCount.textContent = numericValue(data.organizationsSubtitle)
        billingSidebarCount.textContent = data.sidebarPlan
        viewModeBadge.textContent = data.modeBadge
        simulationBadge.hidden = tier !== "enterprise"
        viewEnterpriseBadge.hidden = tier !== "enterprise"
        exploreAdvancedBtn.hidden = tier === "enterprise"

        dashboardSubtitle.textContent = data.dashboardSubtitle
        dashboardActionBtn.textContent = data.dashboardAction
        renderStatCards(dashboardStatCards, data.dashboardStats)
        dashboardRecentBody.innerHTML = renderRecentRequestRows(data.dashboardRecent)
        dashboardWeekChart.innerHTML = data.dashboardChart
        dashboardActivityFeed.innerHTML = renderActivityFeed(data.dashboardActivity)

        analyticsSubtitle.textContent = data.analyticsSubtitle
        analyticsChart.innerHTML = data.analyticsChart
        analyticsTopEndpoints.innerHTML = renderRankedList(data.analyticsTop)
        analyticsMetrics.innerHTML = renderMetricStack(data.analyticsMetrics)

        apiKeysSubtitle.textContent = data.apiKeysSubtitle
        apiKeysBody.innerHTML = renderApiKeysRows(data.apiKeys)

        logsBody.innerHTML = renderRequestLogRows(data.logs)

        rateLimitBody.innerHTML = renderRateLimitRows(data.rateLimits)
        rateLimitStats.innerHTML = data.rateLimitStats.join("")

        billingSubtitle.textContent = data.billingSubtitle
        renderStatCards(billingStatCards, data.billingStats)
        billingInvoicesBody.innerHTML = renderInvoices(data.billingInvoices)
        billingPlanBreakdown.innerHTML = renderRankedList(data.billingPlans)
        billingWebhookFeed.innerHTML = renderActivityFeed(data.billingWebhooks)

        organizationsSubtitle.textContent = data.organizationsSubtitle
        organizationsBody.innerHTML = renderOrganizations(data.organizations)

        enterpriseEndpointBreakdown.innerHTML = renderRankedList(enterpriseData.endpointBreakdown)
        enterpriseOrgSegments.innerHTML = renderSegmentList(enterpriseData.orgSegments)
        enterpriseSecuritySignals.innerHTML = renderActivityFeed(enterpriseData.securitySignals)
        analyticsEnterpriseSegments.innerHTML = renderSegmentList(enterpriseData.analyticsSegments)
        analyticsInfraSignals.innerHTML = renderMetricStack(enterpriseData.infraSignals)
        keyRotationFeed.innerHTML = renderActivityFeed(enterpriseData.keyRotation)
        securityAlertsFeed.innerHTML = renderActivityFeed(enterpriseData.securityAlerts)
        billingOverages.innerHTML = renderMetricStack(enterpriseData.billingOverages)
        billingSubscriptionMix.innerHTML = renderRankedList(enterpriseData.billingMix)
        organizationsRoles.innerHTML = renderRankedList(enterpriseData.roles)
        organizationsTeams.innerHTML = renderActivityFeed(enterpriseData.teams)

        if (announce) {
            showToast(capitalize(tier) + " view activated", "success")
        }
    }

    sidebarLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault()
            showView(link.dataset.view)

            if (window.innerWidth <= 900 && sidebar) {
                sidebar.classList.remove("sidebar--open")
            }
        })
    })

    panelLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault()
            showView(link.dataset.view)
        })
    })

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", function () {
            sidebar.classList.toggle("sidebar--open")
        })

        document.addEventListener("click", function (event) {
            if (window.innerWidth <= 900 && !sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove("sidebar--open")
            }
        })
    }

    tierButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            switchTier(button.dataset.tier, true)
        })
    })

    exploreAdvancedBtn.addEventListener("click", function () {
        switchTier("enterprise", true)
    })

    document.addEventListener("click", function (event) {
        const tierJump = event.target.closest("[data-tier-jump]")
        const approveBtn = event.target.closest(".action-btn--approve")
        const rejectBtn = event.target.closest(".action-btn--reject")
        const actionBtn = event.target.closest(".btn-action")

        if (tierJump) {
            switchTier(tierJump.dataset.tierJump, true)
            return
        }

        if (approveBtn) {
            const row = approveBtn.closest("tr")
            if (row) {
                const name = row.querySelector(".td-name")
                showToast("Approved: " + (name ? name.textContent : "Request"), "success")
                row.style.opacity = "0.4"
                row.style.pointerEvents = "none"
            }
        }

        if (rejectBtn) {
            const row = rejectBtn.closest("tr")
            if (row) {
                const name = row.querySelector(".td-name")
                showToast("Rejected: " + (name ? name.textContent : "Request"), "error")
                row.style.opacity = "0.4"
                row.style.pointerEvents = "none"
            }
        }

        if (actionBtn && !actionBtn.classList.contains("btn-action--outline")) {
            const label = actionBtn.textContent.trim()
            if (
                label.includes("New API Key") ||
                label.includes("Create Key") ||
                label.includes("Add Organization") ||
                label.includes("New Workflow") ||
                label.includes("New Rule")
            ) {
                showToast("Creating new items is disabled in demo mode", "error")
            }
        }
    })

    const searchInput = document.querySelector(".topbar-search input")
    if (searchInput) {
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && searchInput.value.trim()) {
                showToast("Search is disabled in demo mode", "error")
                searchInput.value = ""
            }
        })
    }

    switchTier(currentTier, false)

    function showToast(message, type) {
        const existing = document.querySelector(".demo-toast")
        if (existing) {
            existing.remove()
        }

        const toast = document.createElement("div")
        toast.className = "demo-toast demo-toast--" + type
        toast.textContent = message
        toast.style.cssText = [
            "position:fixed",
            "bottom:28px",
            "right:28px",
            "z-index:9999",
            "padding:12px 20px",
            "border-radius:10px",
            "font-size:0.875rem",
            "font-weight:600",
            "font-family:Inter,system-ui,sans-serif",
            "box-shadow:0 8px 24px rgba(0,0,0,0.14)",
            "animation:slideInToast 0.25s ease",
            type === "success"
                ? "background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0"
                : "background:#fef2f2;color:#dc2626;border:1px solid #fecaca"
        ].join(";")

        document.body.appendChild(toast)

        setTimeout(function () {
            toast.style.opacity = "0"
            toast.style.transition = "opacity 0.3s"
            setTimeout(function () {
                toast.remove()
            }, 300)
        }, 3500)
    }

    const style = document.createElement("style")
    style.textContent = "@keyframes slideInToast{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}"
    document.head.appendChild(style)

    function renderStatCards(cards, values) {
        cards.forEach(function (card, index) {
            const statValue = card.querySelector(".stat-value")
            const statDelta = card.querySelector(".stat-delta")
            if (!values[index]) {
                return
            }
            statValue.textContent = values[index].value
            statDelta.textContent = values[index].delta
        })
    }

    function renderRecentRequestRows(rows) {
        return rows.map(function (row) {
            return `
                <tr>
                    <td><span class="method-badge ${methodClass(row[0])}">${row[0]}</span></td>
                    <td class="td-name">${row[1]}</td>
                    <td><span class="badge ${row[2]}">${row[3]}</span></td>
                    <td class="td-meta">${row[4]}</td>
                    <td class="td-meta">${row[5]}</td>
                </tr>
            `
        }).join("")
    }

    function renderActivityFeed(items) {
        return items.map(function (item) {
            return [
                '<li class="activity-item">',
                '<span class="activity-dot activity-dot--' + item[0] + '"></span>',
                '<div class="activity-body"><p>' + item[1] + "</p><span>" + item[2] + "</span></div>",
                "</li>"
            ].join("")
        }).join("")
    }

    function renderRankedList(items) {
        return items.map(function (item) {
            return [
                '<li class="ranked-item">',
                '<span class="rank-num">' + item[0] + "</span>",
                '<span class="rank-name">' + item[1] + "</span>",
                '<span class="rank-val">' + item[2] + "</span>",
                "</li>"
            ].join("")
        }).join("")
    }

    function renderMetricStack(items) {
        return items.map(function (item) {
            return `
                <div class="metric-row">
                    <span class="metric-label">${item[0]}</span>
                    <span class="metric-val ${item[2] || ""}">${item[1]}</span>
                </div>
            `
        }).join("")
    }

    function renderSegmentList(items) {
        return items.map(function (item) {
            return `
                <li class="segment-item">
                    <span class="segment-name">
                        <span class="segment-title">${item[0]}</span>
                        <span class="segment-meta">${item[1]}</span>
                    </span>
                    <span class="segment-value">${item[2]}</span>
                </li>
            `
        }).join("")
    }

    function renderApiKeysRows(rows) {
        return rows.map(function (row) {
            return `
                <tr>
                    <td class="td-name">${row.name}</td>
                    <td class="td-meta td-mono">${row.prefix}</td>
                    <td class="td-meta">${row.scopes}</td>
                    <td class="td-meta">${row.requests}</td>
                    <td class="td-meta">${row.lastUsed}</td>
                    <td><span class="badge ${row.badgeClass}">${row.status}</span></td>
                    <td class="td-actions"><button class="action-btn action-btn--${row.actionType}">${row.actionLabel}</button></td>
                </tr>
            `
        }).join("")
    }

    function renderRequestLogRows(rows) {
        return rows.map(function (row) {
            return `
                <tr>
                    <td><span class="method-badge ${methodClass(row.method)}">${row.method}</span></td>
                    <td class="td-name">${row.endpoint}</td>
                    <td><span class="badge ${row.badgeClass}">${row.status}</span></td>
                    <td class="td-meta">${row.latency}</td>
                    <td class="td-meta">${row.ip}</td>
                    <td class="td-meta td-mono">${row.key}</td>
                    <td class="td-meta">${row.time}</td>
                </tr>
            `
        }).join("")
    }

    function renderRateLimitRows(rows) {
        return rows.map(function (row) {
            return `
                <tr>
                    <td class="td-name">${row.name}</td>
                    <td class="td-meta">${row.limit}</td>
                    <td class="td-meta">${row.window}</td>
                    <td class="td-meta">${row.used}</td>
                    <td><div class="usage-bar ${row.warn ? "usage-bar--warn" : ""}"><div class="usage-fill ${row.warn ? "usage-fill--warn" : ""}" style="width:${row.percent}%"></div></div></td>
                    <td><span class="badge ${row.badgeClass}">${row.status}</span></td>
                </tr>
            `
        }).join("")
    }

    function renderInvoices(rows) {
        return rows.map(function (row) {
            return `
                <tr>
                    <td class="td-name">${row.org}</td>
                    <td class="td-meta">${row.plan}</td>
                    <td class="td-meta">${row.amount}</td>
                    <td class="td-meta">${row.date}</td>
                    <td><span class="badge ${row.badgeClass}">${row.status}</span></td>
                </tr>
            `
        }).join("")
    }

    function renderOrganizations(rows) {
        return rows.map(function (row) {
            return `
                <tr>
                    <td class="td-name">${row.name}</td>
                    <td class="td-meta">${row.plan}</td>
                    <td class="td-meta">${row.members}</td>
                    <td class="td-meta">${row.keys}</td>
                    <td class="td-meta">${row.requests}</td>
                    <td><span class="badge ${row.badgeClass}">${row.status}</span></td>
                </tr>
            `
        }).join("")
    }

    function bars(items) {
        return items.map(function (item) {
            return [
                '<div class="bar-col">',
                '<div class="bar ' + barVariant(item[2]) + '" style="height:' + item[1] + '%"></div>',
                '<span class="bar-label">' + item[0] + "</span>",
                "</div>"
            ].join("")
        }).join("")
    }

    function methodClass(method) {
        return {
            POST: "method-post",
            GET: "method-get",
            DELETE: "method-delete"
        }[method] || "method-get"
    }

    function barVariant(variant) {
        if (variant === "active") {
            return "bar--active"
        }
        if (variant === "dim") {
            return "bar--dim"
        }
        return ""
    }

    function numericValue(text) {
        const match = text.match(/\d+/)
        return match ? match[0] : text
    }

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    function keyRow(name, prefix, scopes, requests, lastUsed, badgeClass, status, actionType, actionLabel) {
        return { name: name, prefix: prefix, scopes: scopes, requests: requests, lastUsed: lastUsed, badgeClass: badgeClass, status: status, actionType: actionType, actionLabel: actionLabel }
    }

    function logRow(method, endpoint, badgeClass, status, latency, ip, key, time) {
        return { method: method, endpoint: endpoint, badgeClass: badgeClass, status: status, latency: latency, ip: ip, key: key, time: time }
    }

    function limitRow(name, limit, window, used, percent, warn, badgeClass, status) {
        return { name: name, limit: limit, window: window, used: used, percent: percent, warn: warn, badgeClass: badgeClass, status: status }
    }

    function statCard(label, value, delta, iconColor, deltaClass) {
        return [
            '<div class="stat-card">',
            '<div class="stat-header"><span class="stat-label">' + label + '</span><span class="stat-icon stat-icon--' + iconColor + '">▣</span></div>',
            '<div class="stat-value">' + value + "</div>",
            '<div class="stat-delta ' + deltaClass + '">' + delta + "</div>",
            "</div>"
        ].join("")
    }

    function invoiceRow(org, plan, amount, date, badgeClass, status) {
        return { org: org, plan: plan, amount: amount, date: date, badgeClass: badgeClass, status: status }
    }

    function organizationRow(name, plan, members, keys, requests, badgeClass, status) {
        return { name: name, plan: plan, members: members, keys: keys, requests: requests, badgeClass: badgeClass, status: status }
    }
})
