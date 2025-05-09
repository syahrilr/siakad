"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Filter, PlusCircle, Search } from "lucide-react";

import { PaginationControls } from "@/components/globals/pagination-controls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUniqueCategories, getUniqueTags, threads } from "@/lib/data";

import { ThreadList } from "./thread-list";

export default function ForumContent() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [filteredThreads, setFilteredThreads] = useState(threads);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  // Get unique categories and tags
  const categories = getUniqueCategories();
  const tags = getUniqueTags();

  // Filter threads based on search query, category, and tag
  useEffect(() => {
    let result = [...threads];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (thread) =>
          thread.title.toLowerCase().includes(query) ||
          thread.content.toLowerCase().includes(query) ||
          thread.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      result = result.filter((thread) => thread.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter((thread) => thread.tags.includes(selectedTag));
    }

    setFilteredThreads(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedTag]);

  // Calculate pagination
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(
    indexOfFirstThread,
    indexOfLastThread
  );
  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = Math.min(indexOfFirstThread + 1, filteredThreads.length);
  const end = Math.min(indexOfLastThread, filteredThreads.length);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
    setSelectedTag(undefined);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forum Diskusi</h1>
          <p className="text-muted-foreground">
            Diskusikan topik medis dengan komunitas Medscholar
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/forum-diskusi/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Buat Diskusi
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Cari diskusi..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedTag}
            onValueChange={(value) => setSelectedTag(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tag</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchQuery || selectedCategory || selectedTag) && (
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Menampilkan {start}-{end} dari {filteredThreads.length} diskusi
          {selectedCategory &&
            selectedCategory !== "all" &&
            ` dalam kategori "${selectedCategory}"`}
          {selectedTag &&
            selectedTag !== "all" &&
            ` dengan tag "${selectedTag}"`}
          {searchQuery && ` untuk pencarian "${searchQuery}"`}
        </p>

        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <Select defaultValue="newest">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="most_viewed">Paling Dilihat</SelectItem>
              <SelectItem value="most_commented">Paling Dikomentari</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Thread list */}
      {currentThreads.length > 0 ? (
        <div className="space-y-6">
          <ThreadList threads={currentThreads} />

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="text-muted-foreground mb-4 h-12 w-12" />
          <h2 className="mb-2 text-xl font-semibold">Tidak Ada Diskusi</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {searchQuery || selectedCategory || selectedTag
              ? "Tidak ada diskusi yang sesuai dengan filter yang dipilih."
              : "Belum ada diskusi yang dibuat. Jadilah yang pertama memulai diskusi!"}
          </p>
          {searchQuery || selectedCategory || selectedTag ? (
            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filter
            </Button>
          ) : (
            <Link href="/dashboard/forum-diskusi/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Buat Diskusi
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
