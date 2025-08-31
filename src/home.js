import React from "react";
import { useNavigate } from "react-router-dom";

const dashboardItems = [
	{
		title: "IITJ Logs",
		description: "View and manage IITJ logs",
		icon: "📚",
		route: "/IITJLogs",
	},
	{
		title: "Logs",
		description: "View and manage your logs",
		icon: "📅",
		route: "/Logs",
	},
	{
		title: "Notes",
		description: "Manage and organize subject notes",
		icon: "📝",
		route: "/Notes",
	},
	{
		title: "Calculator",
		description: "Advanced calculator functions",
		icon: "🧮",
		route: "/CalculatorAdv",
	},
	{
		title: "Approvals",
		description: "Review and manage access requests",
		icon: "✅",
		route: "/Approvals",
	},
];

const Home = () => {
	const navigate = useNavigate();
	return (
		<div style={{ paddingBottom: "2rem" }}>
			<h2>Dashboard Overview</h2>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(3, 1fr)",
							gridTemplateRows: "repeat(2, 1fr)",
							gap: "1.2rem",  
							marginTop: "2rem",
						}}
					>
						{dashboardItems.map((item) => (
							<div
								key={item.title}
								onClick={() => navigate(item.route)}
								style={{
									background: "#fff",
									borderRadius: "10px",
									boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
									padding: "1.2rem 0.7rem",
									cursor: "pointer",
									transition: "box-shadow 0.2s",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									minHeight: "140px",
									minWidth: "140px",
								}}
							>
								<span style={{ fontSize: "2rem", marginBottom: "0.7rem" }}>{item.icon}</span>
								<h3 style={{ margin: "0 0 0.3rem 0", fontSize: "1.1rem" }}>{item.title}</h3>
								<p style={{ textAlign: "center", color: "#555", fontSize: "0.95rem" }}>{item.description}</p>
							</div>
						))}
					</div>
		</div>
	);
};

export default Home;
