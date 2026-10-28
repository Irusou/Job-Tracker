import type { Application } from "@/types/Application";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { statusConfig } from "@/constants/applicationStatus";
import { Box, Flex, Heading, Text, Badge, Grid } from "@chakra-ui/react";
import { updateApplicationStatus } from "@/api/applications";

export default function Board() {
  const loaded = useLoaderData<Application[]>();
  const [apps, setApps] = useState<Application[]>(loaded);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<string | null>(null);

  // Keep local state in sync if the loader revalidates
  useEffect(() => {
    setApps(loaded);
  }, [loaded]);

  const statuses = Object.keys(statusConfig);

  function moveApp(id: string, newStatus: string) {
    const app = apps.find((a) => String((a as any).id) === id);
    if (!app || (app as any).status === newStatus) return;

    // Optimistic update
    const previous = apps;
    setApps((curr) =>
      curr.map((a) =>
        String((a as any).id) === id
          ? ({ ...a, status: newStatus } as Application)
          : a,
      ),
    );

    updateApplicationStatus(id, newStatus).catch(() => setApps(previous));
  }

  return (
    <Grid
      gap="4"
      p="4"
      alignItems="start"
      templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
    >
      {statuses.map((status) => {
        const config = (statusConfig as Record<string, any>)[status];
        const columnApps = apps.filter((a) => (a as any).status === status);

        return (
          <Flex
            key={status}
            direction="column"
            gap="3"
            p="3"
            borderRadius="lg"
            bg={overStatus === status ? "bg.emphasized" : "bg.muted"}
            transition="background 0.15s"
            onDragOver={(e) => {
              e.preventDefault(); // required, otherwise drop is not allowed
              setOverStatus(status);
            }}
            onDragLeave={(e) => {
              // ignore leave events fired when moving over child elements
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setOverStatus(null);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("text/plain");
              if (id) moveApp(id, status);
              setOverStatus(null);
              setDraggingId(null);
            }}
          >
            <Flex align="center" justify="space-between">
              <Heading size="sm">{config?.label ?? status}</Heading>
              <Badge>{columnApps.length}</Badge>
            </Flex>

            <Flex direction="column" gap="2" minH="120px">
              {columnApps.map((app) => {
                const id = String((app as any).id);
                return (
                  <Box
                    key={id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", id);
                      e.dataTransfer.effectAllowed = "move";
                      setDraggingId(id);
                    }}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setOverStatus(null);
                    }}
                    opacity={draggingId === id ? 0.4 : 1}
                    bg="bg.panel"
                    borderWidth="1px"
                    borderRadius="md"
                    p="3"
                    shadow="xs"
                    cursor="grab"
                  >
                    {/* Adjust these fields to match your Application type */}
                    <Text fontWeight="medium">{(app as any).company}</Text>
                    <Text fontSize="sm" color="fg.muted">
                      {(app as any).position ?? (app as any).title}
                    </Text>
                  </Box>
                );
              })}

              {columnApps.length === 0 && (
                <Text fontSize="sm" color="fg.subtle" textAlign="center" pt="4">
                  Drop an application here
                </Text>
              )}
            </Flex>
          </Flex>
        );
      })}
    </Grid>
  );
}
