import { Link as RouterLink } from "react-router";
import { useTheme } from "next-themes";
import { Badge, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Building2, BellRing, BarChart3, Sun, Moon } from "lucide-react";

type BoardCard = {
  company: string;
  role: string;
};

type BoardColumn = {
  stage: string;
  colorPalette: string;
  cards: BoardCard[];
};

const boardData: BoardColumn[] = [
  {
    stage: "Applied",
    colorPalette: "gray",
    cards: [
      { company: "Northwind Labs", role: "Frontend Engineer" },
      { company: "Basecamp Co.", role: "Product Designer" },
    ],
  },
  {
    stage: "Interviewing",
    colorPalette: "blue",
    cards: [{ company: "Fielder", role: "Senior Engineer" }],
  },
  {
    stage: "Offer",
    colorPalette: "green",
    cards: [{ company: "Arclight", role: "Full-stack Engineer" }],
  },
];

const features = [
  {
    icon: Building2,
    title: "One board, every stage",
    body: "Watch each application move from applied to offer without digging back through your inbox.",
  },
  {
    icon: BellRing,
    title: "Never miss a follow-up",
    body: "A quiet nudge when it's time to check back in on an interview or an application gone quiet.",
  },
  {
    icon: BarChart3,
    title: "See your numbers",
    body: "Response rate, interview rate, time-to-offer tallied automatically as you go.",
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle color theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}

export default function Home() {
  return (
    <Box maxW="6xl" mx="auto" px="4">
      <Flex justifyContent="space-between" alignItems="center" py="6">
        <Text fontWeight="semibold" fontSize="lg">
          Job Tracker
        </Text>

        <Flex gap="2" alignItems="center">
          <Button asChild variant="ghost" size="sm">
            <RouterLink to="/login">Sign in</RouterLink>
          </Button>

          <ThemeToggle />
        </Flex>
      </Flex>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "10", lg: "16" }}
        alignItems="center"
        mt={{ base: "8", md: "14" }}
        mb={{ base: "10", md: "16" }}
      >
        <Box maxW="480px">
          <Heading size="4xl" lineHeight="1.1">
            Every application, one ledger.
          </Heading>

          <Text color="fg.muted" mt="4">
            Log where you've applied, track where you stand, and know what's due
            next job hunting without the spreadsheet you keep forgetting to
            update.
          </Text>

          <Flex gap="3" mt="6">
            <Button asChild colorPalette="green">
              <RouterLink to="/signin">Start tracking</RouterLink>
            </Button>

            <Button asChild variant="outline">
              <RouterLink to="/login">Sign in</RouterLink>
            </Button>
          </Flex>
        </Box>

        <Box
          flex="1"
          width="full"
          borderWidth="1px"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
          p={{ base: "4", md: "5" }}
        >
          <Flex justifyContent="space-between" alignItems="center" mb="4">
            <Text fontSize="xs" fontWeight="semibold" color="fg.muted">
              THIS WEEK
            </Text>

            <Badge colorPalette="green">4 active</Badge>
          </Flex>

          <Flex gap={{ base: "4", md: "6" }} alignItems="flex-start">
            {boardData.map((column) => (
              <Box key={column.stage} flex="1" minW="0">
                <Flex gap="2" alignItems="center" mb="2.5">
                  <Badge colorPalette={column.colorPalette} size="xs">
                    {column.stage}
                  </Badge>

                  <Text fontSize="xs" color="fg.muted">
                    {column.cards.length}
                  </Text>
                </Flex>

                <Flex direction="column" gap="2">
                  {column.cards.map((card) => (
                    <Box
                      key={card.company}
                      borderWidth="1px"
                      borderColor="border"
                      borderRadius="md"
                      px="3"
                      py="2.5"
                    >
                      <Text fontWeight="medium" fontSize="sm">
                        {card.company}
                      </Text>

                      <Text fontSize="xs" color="fg.muted" mt="0.5">
                        {card.role}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>

      <Box borderTopWidth="1px" borderColor="border" pt="10" pb="12">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "8", md: "10" }}
        >
          {features.map((feature) => (
            <Box key={feature.title} flex="1">
              <Flex
                width="9"
                height="9"
                borderRadius="md"
                bg="bg.muted"
                alignItems="center"
                justifyContent="center"
                mb="3"
              >
                <feature.icon size={18} />
              </Flex>

              <Text fontWeight="medium">{feature.title}</Text>

              <Text color="fg.muted" fontSize="sm" mt="1">
                {feature.body}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
