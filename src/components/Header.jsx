import React, { useRef, useState } from "react";
import { AlignLeft, X, Bell, Globe, LogOut } from "lucide-react";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";

const languages = [
	{ code: "en", label: "English" },
	{ code: "fr", label: "Français" },
	{ code: "es", label: "Español" },
];

export default function Header({ collapsed: collapsedProp, onToggleSidebar }) {
	const op = useRef(null);
	const langOp = useRef(null);
	const notifOp = useRef(null);
	const [language, setLanguage] = useState(languages[0].code);

	const handleToggleSidebar = () => {
		if (onToggleSidebar) {
			onToggleSidebar();
		}
	};

	// Use prop if controlled, otherwise local state
	const collapsed = collapsedProp ?? false;

	const handleLogout = () => {
		localStorage.removeItem("isAuthenticated");
		window.location.reload();
	};

	const handleLanguageChange = (code) => {
		setLanguage(code);
		if (langOp.current && langOp.current.hide) langOp.current.hide();
		// Add your i18n logic here if needed
	};

	const handleShowNotifications = (e) => {
		if (notifOp.current && notifOp.current.toggle) notifOp.current.toggle(e);
	};

	const unreadCount = 4;

	return (
		<header className="header bg-white h-16 flex items-center justify-between px-4 shadow-sm">
			<div className="flex items-center gap-2">
				<div
					className="group rounded cursor-pointer p-2 transition flex items-center justify-center text-[var(--primary)] hover:bg-[var(--sidebar-border)]"
					onClick={handleToggleSidebar}
					aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
					tabIndex={0}
					role="button"
					onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleToggleSidebar()}
				>
					{collapsed ? <X size={22} /> : <AlignLeft size={22} />}
				</div>
			</div>
			<div className="flex items-center gap-[10px]">
				{/* Notifications */}
				<span className="relative inline-block">
					<span
						className="p-2 rounded cursor-pointer transition flex items-center justify-center hover:bg-[var(--sidebar-border)]"
						aria-label="Notifications"
						tabIndex={0}
						role="button"
						onClick={handleShowNotifications}
						onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleShowNotifications(e)}
					>
						<Bell size={20} color="var(--primary)" />
					</span>
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
						{unreadCount}
					</span>
					<OverlayPanel
						ref={notifOp}
						className="rounded-lg shadow-lg min-w-[340px] max-w-[360px] flex flex-col gap-0 p-0"
						style={{
							background: "var(--card-bg)",
							border: "1px solid var(--sidebar-border)",
							padding: 0,
						}}
					>
						<div className="flex items-center justify-between px-4 pt-4 pb-2">
							<div className="font-semibold text-base">Notifications</div>
							<span className="bg-red-100 text-red-500 text-xs font-semibold rounded-full px-3 py-1">
								{unreadCount} Unread
							</span>
						</div>
						{/* Notification List */}
						<div className="max-h-[340px] overflow-y-auto">
							<div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
								<Avatar
									image="https://randomuser.me/api/portraits/women/44.jpg"
									shape="circle"
									size="large"
									className="flex-shrink-0"
								/>
								<div className="flex-1">
									<div className="font-semibold text-sm">
										Welcome to Adminsphere! <span className="ml-1">👋</span>
									</div>
									<div className="text-xs text-gray-500">
										Your account has been successfully created.
									</div>
									<div className="text-xs text-[#b0b7d1] mt-1">Just Now</div>
								</div>
							</div>
							<div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
								<div className="flex items-center justify-center bg-green-100 text-green-500 font-bold rounded-full w-10 h-10 text-sm">
									JD
								</div>
								<div className="flex-1">
									<div className="font-semibold text-sm">Monthly Report Ready</div>
									<div className="text-xs text-gray-500">
										Your monthly analytics report is now available.
									</div>
									<div className="text-xs text-[#b0b7d1] mt-1">10 Min Ago</div>
								</div>
							</div>
							<div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
								<Avatar
									image="https://randomuser.me/api/portraits/men/45.jpg"
									shape="circle"
									size="large"
									className="flex-shrink-0"
								/>
								<div className="flex-1">
									<div className="font-semibold text-sm">
										New Order Placed <span className="ml-1">🛒</span>
									</div>
									<div className="text-xs text-gray-500">
										Order #5678 has been placed by Michael.
									</div>
									<div className="text-xs text-[#b0b7d1] mt-1">1 Hour Ago</div>
								</div>
							</div>
							<div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
								<div className="flex items-center justify-center bg-blue-100 text-blue-500 font-bold rounded-full w-10 h-10 text-sm">
									AR
								</div>
								<div className="flex-1">
									<div className="font-semibold text-sm">Password Changed</div>
									<div className="text-xs text-gray-500">
										Your password was changed successfully.
									</div>
									<div className="text-xs text-[#b0b7d1] mt-1">Yesterday</div>
								</div>
							</div>
						</div>
						<div className="py-3 text-center">
							<a
								href="#"
								className="text-[var(--primary)] text-sm font-medium hover:underline"
							>
								View All &rarr;
							</a>
						</div>
					</OverlayPanel>
				</span>
				{/* Language */}
				<div
					className="group rounded relative cursor-pointer p-2 transition flex items-center justify-center hover:bg-[var(--sidebar-border)]"
					aria-label="Change language"
					tabIndex={0}
					role="button"
					onClick={(e) => langOp.current && langOp.current.toggle && langOp.current.toggle(e)}
					onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && langOp.current && langOp.current.toggle && langOp.current.toggle(e)}
				>
					<Globe size={20} color="var(--primary)" />
					<OverlayPanel
						ref={langOp}
						className="rounded-lg shadow-lg min-w-[140px] flex flex-col gap-1"
						style={{
							background: "var(--card-bg)",
							border: "1px solid var(--sidebar-border)",
							padding: 0,
						}}
					>
						{languages.map((lang) => (
							<div
								key={lang.code}
								className={`px-4 py-2 cursor-pointer hover:bg-[var(--sidebar-border)] transition text-sm ${
									language === lang.code ? "text-[var(--primary)] font-semibold" : "text-[var(--text)]"
								}`}
								onClick={() => handleLanguageChange(lang.code)}
							>
								{lang.label}
							</div>
						))}
					</OverlayPanel>
				</div>
				<span className="text-sm text-gray-700">Welcome, Admin</span>
				<div>
					<Avatar
						image="https://randomuser.me/api/portraits/men/32.jpg"
						shape="circle"
						className="border border-[var(--sidebar-border)] cursor-pointer profile-avatar" 
						onClick={(e) => op.current && op.current.toggle && op.current.toggle(e)}
					/>
					<OverlayPanel
						ref={op}
						className="rounded-lg shadow-lg min-w-[200px] flex flex-col gap-3"
						style={{
							background: "var(--card-bg)",
							border: "1px solid var(--sidebar-border)",
							padding: "0.5rem",
						}}
					>
						<div>
							<div
								className="w-full flex items-center gap-2 justify-start py-2 px-2 rounded cursor-pointer hover:bg-[var(--sidebar-border)] text-[var(--primary)] transition"
								onClick={handleLogout}
								tabIndex={0}
								role="menuitem"
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") handleLogout();
								}}
							>
								<LogOut size={16} />
								<span>Logout</span>
							</div>
						</div>
					</OverlayPanel>
				</div>
			</div>
		</header>
	);
}