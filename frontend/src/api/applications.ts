import { BACKEND_PATH } from "@/config/url";

async function updateApplicationStatus(id: string, status: string) {
  const res = await fetch(`${BACKEND_PATH}/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update application status");
  return res.json();
}

export { updateApplicationStatus };
