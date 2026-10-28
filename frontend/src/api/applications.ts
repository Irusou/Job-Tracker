import { BACKEND_PATH } from "@/config/url";
import type { Application } from "@/types/Application";

async function getAllApplications(): Promise<Application[]> {
  try {
    const response = await fetch(`${BACKEND_PATH}/applications`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw "Failed to get applications";
    }

    const applications = await response.json();
    return applications.data as Application[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getApplicationById(
  applicationId: string,
): Promise<Application | null> {
  try {
    const response = await fetch(
      `${BACKEND_PATH}/applications/${applicationId}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw "Failed to get application";
    }

    const application = await response.json();

    return {
      ...application.data,
      appliedAt: new Date(application.data.appliedAt),
      lastReply: application.data.lastReply
        ? new Date(application.data.lastReply)
        : null,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

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

export { getAllApplications, getApplicationById, updateApplicationStatus };
