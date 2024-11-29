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
  filterEmptyMessage?: string;
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
  filterEmptyMessage,
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
    return filter.showFilteredOnly ? data.filter(filter.filterFn) : data;
  }, [data, filter]);

  if (isLoading) {
    return (
      <ListCardContainer
        className={className}
        title={title}
        description={description}
      >
        <ListCardLoadingSkeleton count={skeletonCount} skeleton={skeleton} />
      </ListCardContainer>
    );
  }

  if (error) {
    return (
      <ListCardErrorState
        className={className}
        title={title}
        description={description}
      />
    );
  }

  if (!filteredData?.length) {
    const message = filter?.showFilteredOnly
      ? filterEmptyMessage
      : emptyMessage;

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
        <ListCardEmptyState message={message} />
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
      <ScrollableContainer>{filteredData.map(listItem)}</ScrollableContainer>
    </ListCardContainer>
  );
}

function ListCardLoadingSkeleton({
  count,
  skeleton,
}: {
  count: number;
  skeleton: ReactNode;
}) {
  return (
    <ScrollableContainer>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{skeleton}</div>
      ))}
    </ScrollableContainer>
  );
}

function ListCardErrorState({
  className,
  title,
  description,
}: {
  className?: string;
  title: string;
  description: string;
}) {
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

function ListCardEmptyState({ message }: { message?: string }) {
  return (
    <div className="h-72 flex justify-center items-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
