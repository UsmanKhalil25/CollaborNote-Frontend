import { ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import ListCardContainer from "@/components/ListCardContainer";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";
import { ScrollableContainer } from "@/components/ScrollableContainer";

interface ListCardProps<T> {
  title: string;
  description: string;
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  listItem: (item: T) => ReactNode;
  filter?: {
    label: string;
    showFilteredOnly: boolean;
    setShowFilteredOnly: (value: boolean) => void;
    filterFn: (item: T) => boolean;
  };
  emptyMessage: string;
  skeletonCount?: number;
  className?: string;
  skeleton?: ReactNode;
}

export function ListCard<T>({
  title,
  description,
  queryKey,
  queryFn,
  listItem,
  filter,
  emptyMessage,
  skeletonCount = 5,
  className,
  skeleton = <UserInfoSkeleton />,
}: ListCardProps<T>) {
  const { data, error, isLoading } = useQuery<T[]>({
    queryKey,
    queryFn,
  });

  const filteredData = useMemo(() => {
    if (!filter || !data) return data;

    return data.filter((item) =>
      filter.showFilteredOnly ? filter.filterFn(item) : true
    );
  }, [data, filter?.showFilteredOnly, filter?.filterFn]);

  if (isLoading) {
    return (
      <ListCardContainer
        className={className}
        title={title}
        description={description}
      >
        <ScrollableContainer>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div key={index}>{skeleton}</div>
          ))}
        </ScrollableContainer>
      </ListCardContainer>
    );
  }

  if (error) {
    return (
      <ListCardContainer
        className={className}
        title={title}
        description={description}
      >
        <div className="h-72 flex justify-center items-center">
          <p className="text-destructive-foreground">Error loading data.</p>
        </div>
      </ListCardContainer>
    );
  }

  if (!filteredData?.length && !filter) {
    return (
      <ListCardContainer
        className={className}
        title={title}
        description={description}
      >
        <div className="h-72 flex justify-center items-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </ListCardContainer>
    );
  }

  return (
    <ListCardContainer
      className={className}
      title={title}
      description={description}
      showFilter={!!filter}
      filterLabel={filter?.label}
      showFilteredOnly={filter?.showFilteredOnly}
      setShowFilteredOnly={filter?.setShowFilteredOnly}
    >
      <ScrollableContainer>{filteredData?.map(listItem)}</ScrollableContainer>
    </ListCardContainer>
  );
}
