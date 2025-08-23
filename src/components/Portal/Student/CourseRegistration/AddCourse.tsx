import { Button, Table, Box, Input, Spinner, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCourses } from "@/api/apiEndpoints";
import { useCourseStore } from "@/stores/courseStore";
import { Course } from "@/types";
import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import NoDataFound from "@/components/Generals/NoDataFound";

export default function AddCourses() {
  const { availableCourses, addCourse, setAvailableCourses } = useCourseStore();
  const [search, setSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(
    undefined
  );

  // Debounce search input for smooth searching
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 350ms debounce
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // Remove keepPreviousData (not supported in this version of useQuery)
  const { data, isLoading, error, isFetching } = useQuery<Course[], Error>({
    queryKey: ["available-courses", debouncedSearch],
    queryFn: () => getAvailableCourses(debouncedSearch),
  });

  useEffect(() => {
    setAvailableCourses(data || []);
  }, [data, setAvailableCourses]);

  // UI feedback for loading
  if (error) return <div>Error loading courses!</div>;

  const rows = availableCourses?.map((course) => (
    <Table.Row key={course.code}>
      <Table.Cell>{course.code}</Table.Cell>
      <Table.Cell>{course.title}</Table.Cell>
      <Table.Cell>{course.units}</Table.Cell>
      <Table.Cell>
        <Button colorScheme="teal" size="sm" onClick={() => addCourse(course)}>
          Add Course
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Box>
      <Flex mb={4} maxW="400px" position="relative">
        {/* Use react-icons FaSearch instead of InputLeftElement */}
        <Box
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
        >
          <Search color="gray" size={15} />
        </Box>
        <Input
          pl="32px"
          placeholder="Search courses by code or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="white"
        />
        {isFetching && !isLoading && (
          <Flex position="absolute" right="10px" h="full" align="center">
            <Spinner size="sm" />
          </Flex>
        )}
      </Flex>
      {isLoading ? (
        <Flex align="center" justify="center" minH="100px">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Course Code</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Units</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows && rows.length > 0 ? (
              rows
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center">
                 <NoDataFound />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}
