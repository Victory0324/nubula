import useTracksFiltered from './useTracksFiltered';
import { useTracks } from '@/app/providers/tracks';
import { renderHook } from '@testing-library/react';
import {
  TrackListSortDirection,
  TrackListSortType,
} from '@/app/(authenticated)/(dashboard)/inventory/InventorySidebar/TrackListSort';

jest.mock('../../../app/providers/tracks');

describe('useFilteredTests', () => {
  it.each([
    [TrackListSortDirection.Asc, ['2', '1']],
    [TrackListSortDirection.Desc, ['1', '2']],
  ])(
    'it should sortby favourites correctly with direction: %p',
    (direction, expected) => {
      let loading = false;
      let tracks = [
        {
          isFavourite: false,
          instanceId: '1',
        },
        {
          isFavourite: true,
          instanceId: '2',
        },
      ] as TrackInstance[];

      // @ts-ignore
      useTracks.mockReturnValue({
        loading,
        tracks,
        setTracks: jest.fn(),
      });

      const { result } = renderHook(() =>
        useTracksFiltered('', TrackListSortType.favorites, direction)
      );
      expect(result.current.loading).toBeFalsy();
      expect(result.current.tracks!.map((t) => t.instanceId)).toEqual(expected);
    }
  );

  it.each([
    [TrackListSortDirection.Asc, ['2', '3', '1']],
    [TrackListSortDirection.Desc, ['1', '3', '2']],
  ])(
    'it should sortby artist/label correctly with direction %p',
    (direction, expected) => {
      let loading = false;
      let tracks = [
        {
          instanceId: '1',
          body: {
            artists: ['xyz'],
          },
        },
        {
          body: {
            artists: ['abc'],
          },
          instanceId: '2',
        },
        {
          body: {
            artists: ['hij'],
          },
          instanceId: '3',
        },
      ] as TrackInstance[];

      // @ts-ignore
      useTracks.mockReturnValue({
        loading,
        tracks,
        setTracks: jest.fn(),
      });

      const { result } = renderHook(() =>
        useTracksFiltered('', TrackListSortType.artistLabel, direction)
      );
      expect(result.current.loading).toBeFalsy();
      expect(result.current.tracks!.map((t) => t.instanceId)).toEqual(expected);
    }
  );

  it.each([
    [TrackListSortDirection.Asc, ['2', '1', '3']],
    [TrackListSortDirection.Desc, ['3', '1', '2']],
  ])('should sortby Owned with direction %p', (direction, expected) => {
    let loading = false;
    let tracks = [
      {
        tokenId: null,
        name: 'xxy',
        instanceId: '1',
      },
      {
        tokenId: 'xyz',
        name: 'xxy',
        instanceId: '2',
      },
      {
        tokenId: null,
        name: 'xxx',
        instanceId: '3',
      },
    ] as TrackInstance[];

    // @ts-ignore
    useTracks.mockReturnValue({
      loading,
      tracks,
      setTracks: jest.fn(),
    });

    const { result } = renderHook(() =>
      useTracksFiltered('', TrackListSortType.owned, direction)
    );

    // It should sort by favourites and then search score.
    expect(result.current.tracks!.map((t) => t.instanceId)).toEqual(expected);
  });

  it.each([
    [TrackListSortDirection.Asc, ['3', '2', '1']],
    [TrackListSortDirection.Desc, ['1', '2', '3']],
  ])(
    'should handle both search and sortby with direction %p',
    (direction, expected) => {
      let loading = false;
      let tracks = [
        {
          isFavourite: false,
          name: 'xxy',
          instanceId: '1',
        },
        {
          isFavourite: true,
          name: 'xxy',
          instanceId: '2',
        },
        {
          isFavourite: true,
          name: 'xxx',
          instanceId: '3',
        },
      ] as TrackInstance[];

      // @ts-ignore
      useTracks.mockReturnValue({
        loading,
        tracks,
        setTracks: jest.fn(),
      });

      const { result } = renderHook(() =>
        useTracksFiltered('xxx', TrackListSortType.favorites, direction)
      );

      // It should sort by favourites and then search score.
      expect(result.current.tracks!.map((t) => t.instanceId)).toEqual(expected);
    }
  );

  it('should handle search with default sorting', () => {
    let loading = false;
    let tracks = [
      {
        isFavourite: false,
        name: 'x',
        instanceId: '1',
      },
      {
        isFavourite: true,
        name: 'xxy',
        instanceId: '2',
      },
      {
        isFavourite: true,
        name: 'xxx',
        instanceId: '3',
      },
    ] as TrackInstance[];

    // @ts-ignore
    useTracks.mockReturnValue({
      loading,
      tracks,
      setTracks: jest.fn(),
    });

    const { result } = renderHook(() =>
      useTracksFiltered(
        'xxx',
        TrackListSortType.default,
        TrackListSortDirection.Asc
      )
    );

    // It should sort only by search score.
    expect(result.current.tracks!.map((t) => t.instanceId)).toEqual(['3', '2']);
  });
});
