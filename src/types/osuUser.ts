export interface OsuUser {
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour: null;
    username: string;
    cover_url: string;
    discord: string;
    has_supported: boolean;
    interests: string | null;
    join_date: string;
    location: string | null;
    max_blocks: number;
    max_friends: number;
    occupation: string;
    playmode: string;
    playstyle: string[];
    post_count: number;
    profile_hue:string | null;
    profile_order: string[];
    title: string | null;
    title_url: string | null;
    twitter: string | null;
    website: string | null;
    country: {
        code: string;
        name: string;
    };
    cover: {
        custom_url: string;
        url: string;
        id: number | null;
    };
    kudosu: {
        available: number;
        total: number;
    };
    account_history: any[];
    active_tournament_banner: any;
    active_tournament_banners: any[];
    badges: any[];
    beatmap_playcounts_count: number;
    comments_count: number;
    current_season_stats: {
        division: {
            colour_tier: string;
            id: number;
            image_url: string;
            name: string;
            threshold: number;
        };
        rank: number;
        season: {
            end_date: null;
            id: number;
            name: string;
            room_count: number;
            start_date: string;
        };
        total_score: number;
    };
    daily_challenge_user_stats: {
        daily_streak_best: number;
        daily_streak_current: number;
        last_update: string;
        last_weekly_streak: string;
        playcount: number;
        top_10p_placements: number;
        top_50p_placements: number;
        user_id: number;
        weekly_streak_best: number;
        weekly_streak_current: number;
    };
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: any[];
    guest_beatmapset_count: number;
    loved_beatmapset_count: number;
    mapping_follower_count: number;
    monthly_playcounts: Array<{
        start_date: string;
        count: number;
    }>;
    nominated_beatmapset_count: number;
    page: {
        html: string;
        raw: string;
    };
    pending_beatmapset_count: number;
    previous_usernames: string[];
    rank_highest: {
        rank: number;
        updated_at: string;
    };
    ranked_beatmapset_count: number;
    replays_watched_counts: Array<{
        start_date: string;
        count: number;
    }>;
    scores_best_count: number;
    scores_first_count: number;
    scores_pinned_count: number;
    scores_recent_count: number;
    statistics: {
        count_100: number;
        count_300: number;
        count_50: number;
        count_miss: number;
        level: {
            current: number;
            progress: number;
        };
        global_rank: number;
        global_rank_exp: string | null;
        pp: number;
        pp_exp: number;
        ranked_score: number;
        hit_accuracy: number;
        play_count: number;
        play_time: number;
        total_score: number;
        total_hits: number;
        maximum_combo: number;
        replays_watched_by_others: number;
        is_ranked: boolean;
        grade_counts: {
            ss: number;
            ssh: number;
            s: number;
            sh: number;
            a: number;
        };
        country_rank: number;
        rank: {
            country: number;
        };
    };
    support_level: number;
    team: {
        flag_url: string;
        id: number;
        name: string;
        short_name: string;
    };
    user_achievements: Array<{
        achieved_at: string;
        achievement_id: number;
    }>;
    rank_history: {
        mode: string;
        data: number[];
    };
    ranked_and_approved_beatmapset_count: number;
    unranked_beatmapset_count: number;
}
