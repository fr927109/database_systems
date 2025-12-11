import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Music, Play, Pause, SkipForward, SkipBack, ListPlus, Headphones, Shuffle, Repeat, Volume2, LogIn, Star, Users, Library } from "lucide-react";

// --- helper data ---
const DEMO_SONGS = [
  { id: 1, title: "Neon Nights", artist: "Ava Lumen", duration: "3:21" },
  { id: 2, title: "Midnight Engine", artist: "Violet Drive", duration: "4:08" },
  { id: 3, title: "Glass River", artist: "Kairo", duration: "2:59" },
  { id: 4, title: "Orbiting", artist: "Sky Lanterns", duration: "3:42" },
  { id: 5, title: "Paper Kites", artist: "North & Pine", duration: "3:10" },
];

const DEMO_ARTISTS = [
  { id: 1, name: "Ava Lumen" },
  { id: 2, name: "Violet Drive" },
  { id: 3, name: "Kairo" },
  { id: 4, name: "Sky Lanterns" },
  { id: 5, name: "North & Pine" },
];

const DEMO_PLAYLISTS = [
  { id: "p1", name: "Daily Mix", count: 26, color: "bg-purple-500" },
  { id: "p2", name: "Focus Flow", count: 18, color: "bg-emerald-500" },
  { id: "p3", name: "Roadtrip '25", count: 42, color: "bg-amber-500" },
  { id: "p4", name: "Gym Heat", count: 31, color: "bg-blue-500" },
];

export default function MusicPlayerMock() {
  const [authed, setAuthed] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  // Remove TS generic to avoid parser errors in some environments
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [playlists, setPlaylists] = useState(DEMO_PLAYLISTS);
  const [currentTrack, setCurrentTrack] = useState(DEMO_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredSongs = useMemo(
    () =>
      DEMO_SONGS.filter(
        (s) => s.title.toLowerCase().includes(query.toLowerCase()) || s.artist.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const filteredArtists = useMemo(
    () => DEMO_ARTISTS.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  function handleCreatePlaylist() {
    const n = playlists.length + 1;
    const colors = ["bg-purple-500", "bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-rose-500"]; 
    const next = { id: `p${n}`, name: `New Playlist ${n}`, count: 0, color: colors[n % colors.length] };
    setPlaylists((p) => [next, ...p]);
  }

  function handleAuthSubmit(e) {
    e.preventDefault();
    setAuthed(true);
    setShowAuth(false);
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F7F3] text-[#24354A]">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-[#E6E2D9]">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <Headphones className="h-6 w-6" />
          <span className="font-semibold tracking-wide">McMusic Hub</span>
          <div className="ml-auto flex items-center gap-2">
            {authed ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 ring-2 ring-emerald-400/40">
                  <AvatarFallback>FR</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="secondary" onClick={() => {setAuthed(false); setShowAuth(true); setAuthMode("login");}}>Sign out</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => {setAuthMode("login"); setShowAuth(true);}}><LogIn className="h-4 w-4 mr-1"/>Log in</Button>
                <Button size="sm" onClick={() => {setAuthMode("signup"); setShowAuth(true);}}><Plus className="h-4 w-4 mr-1"/>Sign up</Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 grid grid-cols-12 gap-4 pt-4 pb-28">
        {/* Sidebar: Playlists */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3">
          <Card className="bg-white/80 border-[#E6E2D9] shadow-lg rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-[#24354A]"><Library className="h-5 w-5"/> Your Playlists</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-3">
                <Button className="w-full" onClick={handleCreatePlaylist}>
                  <ListPlus className="h-4 w-4 mr-2"/>New playlist
                </Button>
              </div>
              <ScrollArea className="h-[420px] pr-2">
                <ul className="space-y-2">
                  {playlists.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#EFE9DA] transition">
                      <div className={`h-9 w-9 rounded-xl ${p.color} flex items-center justify-center`}>
                        <Music className="h-4 w-4"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{p.name}</div>
                        <div className="text-xs text-slate-600">{p.count} songs</div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover:bg-[#EFE9DA]">
                        <Star className="h-4 w-4"/>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <section className="col-span-12 md:col-span-9 lg:col-span-9 space-y-4">
          <Card className="bg-white/80 border-[#E6E2D9] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-[#24354A]">
                <Search className="h-5 w-5"/> Browse & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search songs, artists..." className="pl-9 bg-[#F1EEE6] border-[#E6E2D9]"/>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="sm:ml-auto">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="search">Search</TabsTrigger>
                    <TabsTrigger value="songs">Songs</TabsTrigger>
                    <TabsTrigger value="artists">Artists</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Separator className="my-4 bg-[#E6E2D9]"/>

              {/* Results area */}
              <div>
                {activeTab === "search" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-white/70 border-[#E6E2D9] rounded-2xl">
                      <CardHeader className="pb-2"><CardTitle className="text-base">Top Songs</CardTitle></CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {filteredSongs.map((s) => (
                            <li key={s.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#EFE9DA]">
                              <div className="h-9 w-9 rounded-lg bg-[#E6E2D9] flex items-center justify-center"><Music className="h-4 w-4"/></div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{s.title}</div>
                                <div className="text-xs text-slate-600 truncate">{s.artist}</div>
                              </div>
                              <span className="text-xs text-slate-600 mr-2">{s.duration}</span>
                              <Button size="sm" variant="secondary" onClick={() => {setCurrentTrack(s); setIsPlaying(true);}}>
                                <Play className="h-4 w-4 mr-1"/> Play
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 border-[#E6E2D9] rounded-2xl">
                      <CardHeader className="pb-2"><CardTitle className="text-base">Top Artists</CardTitle></CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {filteredArtists.map((a) => (
                            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EFE9DA]">
                              <Avatar className="h-10 w-10 ring-2 ring-slate-700/70">
                                <AvatarFallback>{a.name.split(" ").map(n => n[0]).slice(0,2).join("")}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{a.name}</div>
                                <div className="text-xs text-slate-600 flex items-center gap-1"><Users className="h-3 w-3"/> Artist</div>
                              </div>
                              <Button size="icon" variant="ghost" className="hover:bg-[#EFE9DA]">
                                <Play className="h-4 w-4"/>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "songs" && (
                  <div className="rounded-xl border border-[#E6E2D9] overflow-hidden">
                    <div className="grid grid-cols-12 text-xs uppercase tracking-wide bg-[#F1EEE6] px-4 py-2">
                      <div className="col-span-6">Title</div>
                      <div className="col-span-4">Artist</div>
                      <div className="col-span-2 text-right">Duration</div>
                    </div>
                    <ScrollArea className="h-[360px]">
                      {filteredSongs.map((s, i) => (
                        <div key={s.id} className="grid grid-cols-12 items-center px-4 py-2 text-sm hover:bg-[#EFE9DA]">
                          <div className="col-span-6 flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="mr-1" onClick={() => {setCurrentTrack(s); setIsPlaying(true);}}>
                              <Play className="h-4 w-4"/>
                            </Button>
                            <span className="truncate">{i + 1}. {s.title}</span>
                          </div>
                          <div className="col-span-4 truncate">{s.artist}</div>
                          <div className="col-span-2 text-right">{s.duration}</div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}

                {activeTab === "artists" && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredArtists.map((a) => (
                      <Card key={a.id} className="bg-white/70 border-[#E6E2D9] rounded-2xl">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Avatar className="h-14 w-14 ring-2 ring-slate-700/70">
                            <AvatarFallback>{a.name.split(" ").map(n => n[0]).slice(0,2).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{a.name}</div>
                            <div className="text-xs text-slate-600">Artist profile</div>
                          </div>
                          <Button size="sm" variant="secondary"><Play className="h-4 w-4 mr-1"/> Play</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Now Playing */}
          <Card className="bg-white/80 border-[#E6E2D9] rounded-2xl">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-[#E6E2D9] grid place-items-center"><Music className="h-6 w-6"/></div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{currentTrack.title}</div>
                  <div className="text-sm text-slate-600 truncate">{currentTrack.artist}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Shuffle className="h-4 w-4"/></Button>
                  <Button variant="ghost" size="icon"><Repeat className="h-4 w-4"/></Button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" size="icon" className="rounded-full"><SkipBack className="h-5 w-5"/></Button>
                <Button onClick={() => setIsPlaying(!isPlaying)} className="rounded-full h-12 w-12">
                  {isPlaying ? <Pause className="h-5 w-5"/> : <Play className="h-5 w-5"/>}
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full"><SkipForward className="h-5 w-5"/></Button>
                <div className="ml-4 flex items-center gap-2 text-sm text-slate-600">
                  <Volume2 className="h-4 w-4"/>
                  <div className="w-32 h-1.5 bg-[#E6E2D9] rounded-full"><div className="w-1/2 h-full bg-slate-300 rounded-full"/></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Player Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30">
        <div className="mx-auto max-w-7xl m-3 p-3 rounded-2xl bg-white/85 border border-[#E6E2D9] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#E6E2D9] grid place-items-center"><Music className="h-5 w-5"/></div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{currentTrack.title}</div>
              <div className="text-xs text-slate-600 truncate">{currentTrack.artist}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon"><SkipBack className="h-4 w-4"/></Button>
              <Button size="icon" className="rounded-full">{isPlaying ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}</Button>
              <Button variant="ghost" size="icon"><SkipForward className="h-4 w-4"/></Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        {/* Make modal navy with white text; labels white as requested */}
        <DialogContent className="sm:max-w-md bg-[#24354A] text-white border-[#E6E2D9] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-white">
              {authMode === "login" ? <LogIn className="h-5 w-5"/> : <Plus className="h-5 w-5"/>}
              {authMode === "login" ? "Log in to McMusic Hub" : "Create your account"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuthSubmit} className="space-y-3">
            <div className="grid gap-2">
              <label className="text-xs text-white">Email</label>
              <Input required type="email" placeholder="you@example.com" className="bg-[#F1EEE6] border-[#E6E2D9] text-[#24354A] placeholder:text-[#6b7280]"/>
            </div>
            <div className="grid gap-2">
              <label className="text-xs text-white">Password</label>
              <Input required type="password" placeholder="••••••••" className="bg-[#F1EEE6] border-[#E6E2D9] text-[#24354A] placeholder:text-[#6b7280]"/>
            </div>
            {authMode === "signup" && (
              <div className="grid gap-2">
                <label className="text-xs text-white">Confirm Password</label>
                <Input required type="password" placeholder="••••••••" className="bg-[#F1EEE6] border-[#E6E2D9] text-[#24354A] placeholder:text-[#6b7280]"/>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <Button type="submit" className="px-6 bg-[#D9B86C] text-[#24354A] hover:bg-[#c6a457]">
                {authMode === "login" ? "Log in" : "Sign up"}
              </Button>
              <Button type="button" variant="ghost" className="text-white hover:underline" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
                {authMode === "login" ? "Create account" : "I have an account"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- lightweight runtime checks (non-blocking) ---
try {
  const byTitle = DEMO_SONGS.filter((s) => s.title.toLowerCase().includes("neon"));
  console.assert(byTitle.length === 1 && byTitle[0].artist === "Ava Lumen", "Song filter basic check failed");
  const artistHit = DEMO_ARTISTS.filter((a) => a.name.toLowerCase().includes("kairo"));
  console.assert(artistHit.length === 1 && artistHit[0].name === "Kairo", "Artist filter basic check failed");
} catch {}
